import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../helper/AxiosInstance";

const TicketCard = ({ ticket }) => {
  const formatShowDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return `${formattedDate}, ${timeString.substring(0, 5)}`;
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-4 mb-4 flex items-start shadow-lg w-full max-w-xl mx-auto border border-zinc-700">
      <div className="relative flex-shrink-0 mr-4">
        <img
          src={import.meta.env.VITE_API_URL + `/storage/${ticket.poster_url}`}
          alt={ticket.movie_title}
          className="w-24 h-36 object-cover rounded-md"
        />
        <div className="absolute bottom-1 right-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5 text-xs font-semibold text-white">
          {ticket?.seat_numbers?.split(",").length} Ticket(s)
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-1 leading-tight">
          {ticket.movie_title}
        </h3>
        <p className="text-sm text-zinc-300 mb-0.5">{ticket.cinema_name}</p>
        <p className="text-xs text-zinc-400 mb-3">
          {formatShowDateTime(ticket.show_date, ticket.show_time)}
        </p>
        <p className="text-sm font-semibold text-cyan-400">Order Completed</p>
      </div>
    </div>
  );
};

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const instance = AxiosInstance();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please log in to view your tickets.");

      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    const fetchMyTickets = async () => {
      try {
        const response = await instance.get("/my-bookings", {
          withCredentials: true,
        });

        setTickets(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);

        if (err.response?.status === 401) {
          toast.error("Your are unauthorized, please log in first.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="aurora-background min-h-screen flex justify-center items-center">
        <p className="text-white text-lg animate-pulse">
          Loading Your Tickets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aurora-background min-h-screen flex justify-center items-center">
        <p className="text-red-400 text-lg text-center px-4">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="aurora-background min-h-screen p-4 sm:p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white ml-4">My Tickets</h2>
        </div>

        <div className="mt-6 space-y-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard key={ticket.booking_id} ticket={ticket} />
            ))
          ) : (
            <div className="p-8 bg-zinc-800/50 rounded-lg text-center text-zinc-400 mx-auto max-w-lg">
              <p>You don't have any order history yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
