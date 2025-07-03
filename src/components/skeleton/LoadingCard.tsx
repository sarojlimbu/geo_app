import React from "react";

const LoadingCard: React.FC = () => {
  return (
    <div className="w-full min-w-sm bg-gray-200 animate-pulse p-4 space-y-4">
      <div className="h-8 bg-gray-300 rounded w-1/2" />
      <div className="h-30 bg-gray-300 rounded" />
      <div className="flex justify-between">
        <div className="h-8 bg-gray-300 rounded w-1/4" />
        <div className="h-8 bg-gray-300 rounded w-1/4" />
      </div>
      <div className="h-60 bg-gray-300 rounded" />
    </div>
  );
};

export default LoadingCard;
