import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";
import BookingSuccessModal from "../../components/schedules/BookingSuccessModal";

const InfoRow = ({ icon, children }) => (
  <div className="flex items-center gap-x-3">
    <span className="text-cyan-400">{icon}</span>
    <p className="text-sm text-zinc-300">{children}</p>
  </div>
);

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const instance = AxiosInstance();

  if (!location.state?.bookingDetails) {
    navigate("/");
    return null;
  }

  const { bookingDetails } = location.state;
  const {
    movie_title,
    poster_url,
    cinema_name,
    show_date,
    show_time,
    selectedSeats,
    totalPrice,
    schedule_id,
  } = bookingDetails;
  const seatNumbers = selectedSeats.map((s) => s.seat_number).join(", ");
  const serviceFee = 5000;
  const finalPrice = totalPrice + serviceFee;

  const handlePay = async () => {
    setIsLoading(true);
    const payload = {
      schedule_id: schedule_id,
      seat_ids: selectedSeats.map((s) => s.id),
    };
    try {
      await instance.post("/bookings", payload);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal membuat booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="bg-zinc-950 min-h-screen flex flex-col font-sans">
        <header className="p-4 flex items-center gap-x-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <h1 className="text-xl font-bold text-white">Order Confirmation</h1>
        </header>

        <main className="flex-grow overflow-y-auto p-4 space-y-6">
          <div className="bg-zinc-900 rounded-xl p-4 flex gap-x-4 border border-zinc-800">
            <img
              src={poster_url}
              alt={movie_title}
              className="w-24 h-36 rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-bold text-white">{movie_title}</h2>
              <InfoRow
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                {cinema_name}
              </InfoRow>
              <InfoRow
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                {new Date(show_date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </InfoRow>
              <InfoRow
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 11.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                {show_time}
              </InfoRow>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-white font-bold mb-4">Order Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <p className="text-zinc-400">
                  Tickets ({selectedSeats.length})
                </p>
                <p className="text-white">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-400">Seats</p>
                <p className="text-white truncate max-w-[50%]">{seatNumbers}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-400">Service Fee</p>
                <p className="text-white">
                  Rp {serviceFee.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <hr className="border-dashed border-zinc-700 my-4" />
            <div className="flex justify-between items-center">
              <p className="text-white font-bold">Total Payment</p>
              <p className="text-cyan-400 font-bold text-xl">
                Rp {finalPrice.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </main>

        <footer className="p-4">
          <button
            onClick={handlePay}
            disabled={isLoading}
            className="w-full text-white bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 disabled:cursor-wait rounded-lg py-4 font-semibold text-lg flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay Rp ${finalPrice.toLocaleString("id-ID")}`
            )}
          </button>
        </footer>
      </div>
      <BookingSuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default OrderConfirmation;
