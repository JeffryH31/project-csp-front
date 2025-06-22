import React from "react";

const AccordionSkeleton = () => {
  return (
    <div className="w-full max-w-2xl bg-zinc-900 rounded-lg shadow-lg overflow-hidden animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="border-b border-zinc-700 last:border-b-0 p-4"
        >
          <div className="flex justify-between items-center">
            <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
            <div className="h-6 w-6 bg-zinc-700 rounded-md"></div>
          </div>
          {index === 0 && (
            <div className="mt-6">
              <div className="h-4 bg-zinc-700 rounded w-1/4 mb-4"></div>
              <div className="h-7 bg-zinc-700 rounded w-1/5 mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-9 bg-zinc-700 rounded-md"></div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionSkeleton;
