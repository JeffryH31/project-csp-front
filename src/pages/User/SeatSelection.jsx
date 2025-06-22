import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";
import BookingSummary from "../../components/schedules/BookingSummary";
import Seat from "../../components/schedules/Seat";
import CinemaScreen from "../../components/cinemas/CinemaScreen";
import { useAuth } from "../../contexts/AuthContext";

const SeatSelection = () => {
  const { schedule_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [scheduleData, setScheduleData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const instance = AxiosInstance();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await instance.get(`/seats/${schedule_id}`);
        setScheduleData(res.data.data);
      } catch (error) {
        toast.error("Gagal memuat data kursi.");
        navigate(-1);
      }
    };
    fetchSeats();
  }, [schedule_id, navigate]);

  const handleSelectSeat = (seat) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleClearSeats = () => {
    setSelectedSeats([]);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.warn("Silakan pilih kursi terlebih dahulu.");
      return;
    }

    if (!user) {
      toast.info("Anda harus login untuk melanjutkan pemesanan.");

      navigate("/login", { state: { from: location } });
      return;
    }

    const bookingDetails = {
      ...scheduleData,
      schedule_id: schedule_id,
      selectedSeats: selectedSeats,
      totalPrice: selectedSeats.length * scheduleData.price,
    };
    navigate("/order-confirmation", { state: { bookingDetails } });
  };

  if (!scheduleData) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white text-center p-10 flex items-center justify-center">
        <p className="text-xl font-semibold animate-pulse">Loading Seats...</p>
      </div>
    );
  }

  const { movie_title, cinema_name, seats, price } = scheduleData;
  const totalPrice = selectedSeats.length * price;

  const renderSeatBlocks = (seatList, row) => {
    const seatMap = new Map(
      seatList.map((seat) => [parseInt(seat.seat_number.substring(1)), seat])
    );

    const seatGrid = (start, count) => {
      return Array.from({ length: count }, (_, i) => {
        const seatNumber = start + i;
        const seat = seatMap.get(seatNumber);

        if (seat) {
          return (
            <Seat
              key={seat.id}
              seat={seat}
              onSelect={handleSelectSeat}
              isSelected={selectedSeats.some((s) => s.id === seat.id)}
            />
          );
        } else {
          return (
            <div
              key={`${row}-${seatNumber}`}
              className="w-6 h-6 md:w-8 md:h-8"
            />
          );
        }
      });
    };

    return (
      <div className="flex justify-center items-center w-full gap-x-3 md:gap-x-8">
        <div className="grid grid-cols-6 gap-1.5 md:gap-2">
          {seatGrid(1, 6)}
        </div>
        <div className="grid grid-cols-6 gap-1.5 md:gap-2">
          {seatGrid(7, 6)}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col">
      <header className="p-4 text-center sticky top-0 bg-zinc-950/80 backdrop-blur-sm z-10">
        <h1 className="text-xl font-bold text-white">{movie_title}</h1>
        <p className="text-sm text-zinc-400">{cinema_name}</p>
      </header>

      <main className="flex-grow overflow-y-auto py-4 px-2">
        <CinemaScreen />
        <div className="space-y-2 md:space-y-3">
          {Object.entries(seats).map(([row, seatList]) => (
            <div key={row} className="flex items-center gap-x-4 justify-center">
              <p className="w-4 text-zinc-500 font-semibold text-sm md:text-base">
                {row}
              </p>
              {renderSeatBlocks(seatList, row)}
              <p className="w-4"></p>
            </div>
          ))}
        </div>
      </main>

      <BookingSummary
        selectedCount={selectedSeats.length}
        totalPrice={totalPrice}
        onContinue={handleContinue}
        onClear={handleClearSeats}
      />
    </div>
  );
};

export default SeatSelection;
