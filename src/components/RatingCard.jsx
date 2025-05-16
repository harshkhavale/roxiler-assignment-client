import { MessageSquareMore, Pencil } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const RatingCard = ({ rating, currentUserId, onUpdate }) => {
  const userId = useSelector((state) => state.users.currentUser.id);
  const isUserRating = rating.user_id === userId;

  return (
    <div className="mb-6 p-4 rounded-lg border border-gray-200 shadow-sm bg-white transition hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-yellow-600 font-medium">
          <MessageSquareMore size={18} />
          <span>{rating.rating} / 5</span>
        </div>

        <span className="text-xs text-gray-500">
          {new Date(rating.createdAt).toLocaleString()}
        </span>
      </div>

      {rating.comment && (
        <p className="text-gray-700 text-sm italic mb-3">“{rating.comment}”</p>
      )}

      {isUserRating && (
        <button
          onClick={() => onUpdate(rating)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 underline hover:no-underline transition"
        >
          <Pencil size={14} /> Update Rating
        </button>
      )}
    </div>
  );
};

export default RatingCard;
