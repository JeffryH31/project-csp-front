import React from "react";

const MovieDetailSkeleton = () => {
  return (
    <div className="bg-zinc-950 min-h-screen animate-pulse">
      <div className="w-full h-96 md:h-[50vh] bg-zinc-800"></div>
      <div className="max-w-6xl mx-auto p-4 md:p-8 -mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 h-72 md:w-64 md:h-96 bg-zinc-700 rounded-xl shadow-2xl -mt-10 md:-mt-16"></div>
          <div className="flex-grow pt-4 md:pt-16">
            <div className="h-12 bg-zinc-700 rounded-lg w-3/4 mb-4"></div>
            <div className="flex gap-4 mb-8">
              <div className="h-8 bg-zinc-700 rounded-full w-24"></div>
              <div className="h-8 bg-zinc-700 rounded-full w-24"></div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="h-10 bg-zinc-800 rounded-lg w-1/2"></div>
          <div className="mt-6 h-48 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;
