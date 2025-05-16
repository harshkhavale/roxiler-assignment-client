import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { del, get, post } from "../../utils";
import StoreForm from "../../components/StoreForm";
import ShowCard from "../../components/ShowCard";
import toast from "react-hot-toast";
import StoreRatingsDrawer from "../../components/StoreRatingsDrawer";
import Loader from "../../components/Loader";

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedStore, setSelectedStore] = useState(null);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.users.currentUser.id);
  const token = useSelector((state) => state.auth.token);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const data = await get("/store", {
        Authorization: `Bearer ${token}`,
      });

      const enrichedData = await Promise.all(
        data.map(async (store) => {
          try {
            const [userRatingRes, statsRes] = await Promise.all([
              get(`/rating?storeId=${store.store_id}`, {
                Authorization: `Bearer ${token}`,
              }).catch(() => null),
              get(`/rating/stats/${store.store_id}`, {
                Authorization: `Bearer ${token}`,
              }).catch(() => null),
            ]);

            return {
              ...store,
              userRating: userRatingRes?.[0]?.rating || null,
              overallRating: statsRes?.averageRating || "N/A",
            };
          } catch (error) {
            console.error(
              `Failed to fetch ratings for store ${store.store_id}:`,
              error
            );
            return {
              ...store,
              userRating: null,
              overallRating: "N/A",
            };
          }
        })
      );

      setStores(enrichedData);
      setFilteredStores(enrichedData);
    } catch (err) {
      console.error("Error fetching stores:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRatingsClick = (store) => {
    setSelectedStore(store);
    setShowDrawer(true);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setFilteredStores(
      stores.filter(
        (store) =>
          store.name.toLowerCase().includes(value) ||
          store.address.toLowerCase().includes(value)
      )
    );
  };

  const handleAddClick = () => {
    setFormMode("add");
    setSelectedStore(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (store) => {
    setFormMode("edit");
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (storeId) => {
    try {
      await del(`/store/${storeId}`, {
        Authorization: `Bearer ${token}`,
      });

      toast.success("Store deleted successfully!");
    } catch (error) {
      console.error("Failed to delete store:", error);
      toast.error("Failed to delete store. Please try again.");
    }
  };

  const handleStoreSubmit = async (values, { resetForm }) => {
    try {
      if (formMode === "add") {
        await post(
          "/store",
          { ...values, userId },
          {
            Authorization: `Bearer ${token}`,
          }
        );
      } else if (formMode === "edit" && selectedStore) {
        await put(
          `/store/${selectedStore.store_id}`,
          { ...values },
          {
            Authorization: `Bearer ${token}`,
          }
        );
      }
      setIsModalOpen(false);
      resetForm();
      fetchStores();
    } catch (error) {
      console.error("Error saving store:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by store name or address"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {loading ? (
        <Loader />
      ) : stores.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4 text-lg">No store found.</p>
          <button
            className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark"
            onClick={handleAddClick}
          >
            Add Store
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark"
              onClick={handleAddClick}
            >
              Add Store
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <ShowCard
                key={store.store_id}
                store={store}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onViewRatings={handleViewRatingsClick}
              />
            ))}
          </div>
        </>
      )}

      <StoreForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleStoreSubmit}
        initialValues={
          selectedStore
            ? {
                name: selectedStore.name,
                address: selectedStore.address,
                email: selectedStore.email,
                image: selectedStore.image,
              }
            : { name: "", address: "", email: "", image: "" }
        }
        mode={formMode}
      />

      <StoreRatingsDrawer
        storeId={selectedStore?.store_id}
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
      />
    </div>
  );
};

export default AdminStores;
