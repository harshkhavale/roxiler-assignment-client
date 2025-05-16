import { DeleteIcon, Edit, StarIcon, TrashIcon, UsersIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../utils";

const ShowCard = ({ store, onEdit, onDelete, onAddRating, onViewRatings }) => {
  const token = useSelector((state) => state.auth.token);

  const role = useSelector((state) => state.auth.role);
  const [rating, setRating] =
    useState(
    {
      averageRating: "0.00",
      totalRatings: 0,
    });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const data = await get(`/rating/stats/${store.store_id}`, {
          Authorization: `Bearer ${token}`,
        });

        setRating({
          averageRating: data.averageRating ?? "0.00",
          totalRatings: data.totalRatings ?? 0,
        });
      } catch (err) {
        setError("Unable to load rating");
        console.error("Error fetching rating:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [store.store_id, token]);

  return (
    <div className="bg-white rounded-lg border p-4 w-full max-w-md">
      <img
        src={store.image}
        alt={store.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold">{store.name}</h3>
      <p className="text-gray-600">{store.address}</p>
      <p className="text-gray-500 text-sm">{store.email}</p>

      <div className="mt-2 text-sm text-gray-700">
        {loading ? (
          <p>Loading rating...</p>
        ) : error ? (
          <p className="text-red-500 border-1 border-red-500  w-min text-nowrap p-[2px]">
            no ratings
          </p>
        ) : (
          <>
            <p className="flex gap-2">
              <StarIcon size={18} /> Average Rating: {rating.averageRating}
            </p>
            <p className="flex gap-2">
              {" "}
              <UsersIcon size={18} /> Total Ratings: {rating.totalRatings}
            </p>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {(role === "admin" || role === "owner") && (
          <>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => onEdit(store)}
            >
              <Edit/>
            </button>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={() => onDelete?.(store.store_id)}
            >
              <TrashIcon/>
            </button>
          </>
        )}
        <button
          className="text-sm bg-primary text-white p-2 rounded-xl  cursor-pointer"
          onClick={() => onViewRatings?.(store)}
        >
          View All Ratings
        </button>
        {role === "user" && (
          <>
            <button
              className="text-sm text-green-600 hover:underline"
              onClick={() => onAddRating?.(store)}
            >
              Add Rating
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
