import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";

const TicketDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const instance = AxiosInstance();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await instance.get(`/bookings/${bookingId}`);
        setTicket(response.data.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch ticket details."
        );
        navigate("/history");
      } finally {
        setLoading(false);
      }
    };
    fetchTicketDetails();
  }, [bookingId, navigate]);

  if (loading) {
    return (
      <div className="aurora-background min-h-screen flex justify-center items-center text-white text-lg animate-pulse">
        Loading E-Ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="aurora-background min-h-screen flex justify-center items-center text-red-400">
        Ticket not found.
      </div>
    );
  }

  return (
    <div className="aurora-background min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center font-sans">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
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

      {/* E-Ticket Component */}
      <div className="w-full max-w-sm bg-zinc-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Top Part with Poster Background */}
        <div className="relative h-48">
          <img
            src={import.meta.env.VITE_STORAGE_URL + ticket.poster_url}
            alt={ticket.movie_title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-2xl font-bold text-white leading-tight shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">
              {ticket.movie_title}
            </h2>
            <p className="text-md text-zinc-200 font-medium">
              {ticket.cinema_name}
            </p>
          </div>
        </div>

        {/* Details Part */}
        <div className="p-5">
          <div className="flex justify-between text-white text-sm">
            <div>
              <p className="text-zinc-400 text-xs">Date</p>
              <p>
                {new Date(ticket.show_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 text-xs">Time</p>
              <p>{ticket.show_time.substring(0, 5)}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-zinc-400 text-xs">Seats</p>
            <p className="text-white text-lg font-bold tracking-widest">
              {ticket.seat_numbers}
            </p>
          </div>

          <div className="border-t border-dashed border-white/20 my-5"></div>

          {/* QR Code Section */}
          <div className="bg-white p-4 rounded-xl flex justify-center items-center">
            <QRCode
              value={ticket.booking_id}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#0D1117"
              level="H"
            />
          </div>
          <p className="text-zinc-500 text-xs text-center mt-2">
            Show this QR code at the cinema
          </p>
        </div>
      </div>
    </div>
);
};

export default TicketDetails;
