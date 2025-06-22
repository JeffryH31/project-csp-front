import React from "react";

const CinemaCardGridSkeleton = () => {
  return (
    <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-zinc-800/80 p-4 rounded-lg animate-pulse flex justify-between items-center h-[72px]"
        >
          <div className="h-6 bg-zinc-700 rounded w-1/2"></div>
          <div className="h-6 w-6 bg-zinc-700 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default CinemaCardGridSkeleton;
