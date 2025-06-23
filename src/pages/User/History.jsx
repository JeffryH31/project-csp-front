import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../helper/AxiosInstance";
import TicketCard from "../../components/bookings/TicketCard";

const History = () => {
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

    const fetchHistory = async () => {
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

    fetchHistory();
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
          ></button>
          <h2 className="text-2xl font-bold text-white ml-4">My Tickets</h2>
        </div>

        <div className="mt-6 space-y-5">
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

export default History;
