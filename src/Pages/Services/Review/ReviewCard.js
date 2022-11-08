import React from "react";

const ReviewCard = ({ getReview }) => {
  return (
    <div>
      <img
        alt="Woman"
        src={getReview.profileImage}
        class="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
      />

      <blockquote class="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
        <p class="text-lg font-bold text-gray-700">{getReview.addedBy}</p>
        <p class="mt-1 text-xs font-medium text-gray-500">{getReview.title}</p>
        <p class="mt-4 text-sm text-gray-500">{getReview.description}</p>

        <div class="mt-8 flex text-xl justify-center gap-0.5 text-green-500">
          Rating: {getReview.rating}/5
        </div>
      </blockquote>
    </div>
  );
};

export default ReviewCard;
