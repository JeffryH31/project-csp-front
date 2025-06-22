import React from 'react';

const ScheduleSelectorsSkeleton = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 animate-pulse">
      <div className="flex gap-x-3 mb-4 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-zinc-700 rounded-full"></div>
        ))}
      </div>
      <div className="flex gap-x-3 overflow-x-auto">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-20 w-16 bg-zinc-700 rounded-lg flex-shrink-0"></div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSelectorsSkeleton;