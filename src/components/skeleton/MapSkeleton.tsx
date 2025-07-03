import React from "react";

const MapSkeleton: React.FC = () => {
  return (
    <div className="absolute inset-0  h-screen md:h-[600px]  bg-gray-200 animate-pulse rounded-md" />
  );
};

export default MapSkeleton;
