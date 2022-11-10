import React from "react";

const ReviewCard = ({ getReview }) => {
  return (
    <div>
      <img
        alt={getReview.addedBy}
        src={getReview.profileImage}
        className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
      />

      <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
        <p className="text-lg font-bold text-gray-700">{getReview.addedBy}</p>

        <p className="mt-4 text-lg text-gray-500">{getReview.description}</p>
      </blockquote>
    </div>
  );
};

export default ReviewCard;
