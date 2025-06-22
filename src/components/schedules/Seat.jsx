import React from "react";

const Seat = ({ seat, onSelect, isSelected }) => {
  const getSeatClass = () => {
    if (!seat.is_available) return "bg-red-600/80 cursor-not-allowed";
    if (isSelected) return "bg-cyan-500 scale-110 shadow-lg shadow-cyan-500/50";
    return "bg-zinc-700 hover:bg-zinc-600";
  };

  return (
    <button
      onClick={() => onSelect(seat)}
      disabled={!seat.is_available}
      className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center text-xs font-semibold text-white transition-all duration-200 ${getSeatClass()}`}
    >
      {seat.seat_number}
    </button>
  );
};

export default Seat;
