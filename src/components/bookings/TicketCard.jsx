import React from "react";
import { useNavigate } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const formatShowDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 hover:border-white/40 hover:-translate-y-1 w-full max-w-xl mx-auto">
      <div className="flex">
        {/* Poster Section */}
        <div className="w-28 flex-shrink-0">
          <img
            src={import.meta.env.VITE_STORAGE_URL + `${ticket.poster_url}`}
            alt={ticket.movie_title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-grow">
          <div>
            <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
              {ticket.cinema_name}
            </p>
            <h3 className="text-lg font-bold text-white leading-tight">
              {ticket.movie_title}
            </h3>
            <p className="text-sm text-zinc-300 mt-1">
              {formatShowDate(ticket.show_date)},{" "}
              {ticket.show_time.substring(0, 5)}
            </p>
          </div>

          <div className="border-t border-dashed border-white/20 my-3"></div>

          <div className="flex justify-between items-center mt-auto">
            <div className="text-center">
              <p className="text-xs text-zinc-400">Tickets</p>
              <p className="font-bold text-white text-lg">
                {ticket?.seat_numbers?.split(",").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
