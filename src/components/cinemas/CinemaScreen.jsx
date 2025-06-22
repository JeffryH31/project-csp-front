import React from "react";

const CinemaScreen = () => {
  return (
    <div className="flex flex-col items-center mb-8 md:mb-12">
      <div
        className="h-2 w-4/5 md:w-3/5 bg-white rounded-t-full"
        style={{
          boxShadow: "0 0 25px 5px rgba(255, 255, 255, 0.5)",
        }}
      ></div>
      <p className="text-zinc-500 text-sm mt-2">Screen</p>
    </div>
  );
};

export default CinemaScreen;
