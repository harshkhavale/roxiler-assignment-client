import {
    ChartNoAxesColumn,
    Edit,
    MessageSquareMore,
    TrashIcon,
  } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { get } from "../utils";
  
  const ShowCard = ({ store, onEdit, onDelete, onAddRating, onViewRatings }) => {
    const token = useSelector((state) => state.auth.token);
    const role = useSelector((state) => state.auth.role);
  
    const [rating, setRating] = useState({
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
      <div className="bg-white border rounded-xl p-5 w-full max-w-md transition hover:shadow-lg">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
  
        <h3 className="text-xl font-bold mb-1">{store.name}</h3>
        <p className="text-sm text-gray-600">{store.address}</p>
        <p className="text-xs text-gray-400 mb-3">{store.email}</p>
  
        <div className="text-sm text-gray-800 space-y-1 mb-4">
          {loading ? (
            <p className="italic text-gray-500">Loading rating...</p>
          ) : error ? (
            <p className="text-red-500 text-xs border border-red-500 inline-block px-2 py-1 rounded">
              No ratings available
            </p>
          ) : (
            <>
              <p className="flex items-center gap-2">
                <MessageSquareMore size={16} className="text-yellow-500" />
                <span>Average Rating: {rating.averageRating}</span>
              </p>
              <p className="flex items-center gap-2">
                <ChartNoAxesColumn size={16} className="text-green-600" />
                <span>Total Ratings: {rating.totalRatings}</span>
              </p>
            </>
          )}
        </div>
  
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {(role === "admin" || role === "owner") && (
            <>
              <button
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                onClick={() => onEdit(store)}
              >
                <Edit size={16} /> Edit
              </button>
  
              <button
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
                onClick={() => onDelete?.(store.store_id)}
              >
                <TrashIcon size={16} /> Delete
              </button>
            </>
          )}
  
          <button
            className="bg-primary text-white text-sm px-4 py-1.5 cursor-pointer rounded-md hover:bg-primary-dark transition"
            onClick={() => onViewRatings?.(store)}
          >
            View Ratings
          </button>
  
          {role === "user" && (
            <button
              className="text-sm text-green-600 hover:text-green-800 underline"
              onClick={() => onAddRating?.(store)}
            >
              Add Rating
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default ShowCard;
  