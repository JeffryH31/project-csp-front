import React from "react";

const BookingSummary = ({ selectedCount, totalPrice, onContinue, onClear }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-zinc-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-zinc-400 text-sm">Seats Picked</p>
            <p className="font-bold text-white text-lg">
              {selectedCount} Seat(s)
            </p>
          </div>
          <div>
            <p className="text-zinc-400 text-sm text-right">Total Price</p>
            <p className="font-bold text-cyan-400 text-lg">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            onClick={onClear}
            className="w-1/3 bg-transparent border border-zinc-600 text-zinc-300 rounded-lg py-3 font-semibold hover:bg-zinc-800 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onContinue}
            className="w-2/3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white rounded-lg py-3 font-semibold transition-colors"
            disabled={selectedCount === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
