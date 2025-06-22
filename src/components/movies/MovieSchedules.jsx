import React, { useEffect, useState } from "react";
import CinemaCardGridSkeleton from "../skeletons/CinemaCardGridSkeleton";
import ScheduleSelectorsSkeleton from "../skeletons/ScheduleSelectorsSkeleton"; 
import { toast } from "react-toastify";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import CinemaCardGrid from "../cinemas/CinemaCardGrid";

const MovieSchedules = ({ movie_id }) => {
  const [cities, setCities] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);

  const instance = AxiosInstance();
  const navigate = useNavigate();
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const fetchSchedules = async (city, date) => {
    setIsScheduleLoading(true);
    const formattedDate = format(date, "yyyy-MM-dd");
    try {
      const res = await instance.get(
        `/schedules/${movie_id}/${city}/${formattedDate}`
      );
      setSchedules(res.data.data);
    } catch (error) {
      setSchedules([]);
    } finally {
      setIsScheduleLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setIsInitialLoading(true);
    try {
      const res = await instance.get(`/movie-cities/${movie_id}`);
      const availableCities = res.data.data;
      setCities(availableCities);
      if (availableCities.length > 0) {
        setSelectedCity(availableCities[0]);
        await fetchSchedules(availableCities[0], selectedDate);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal memuat data kota");
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [movie_id]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    fetchSchedules(city, selectedDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (selectedCity) {
      fetchSchedules(selectedCity, date);
    }
  };

  const handleShowtimeClick = (scheduleId) => {
    navigate(`/seats/${scheduleId}`);
  };

  const cardItems = schedules.map((cinema) => ({
    title: cinema.name,
    content: (
      <div>
        <p className="font-semibold text-white mb-2">Regular 2D</p>
        <p className="text-lg text-cyan-400 font-bold mb-4">
          Rp {cinema.price.toLocaleString("id-ID")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {cinema.show_times.map((show, index) => (
            <button
              key={index}
              className="bg-cyan-500 text-white rounded-md py-2 px-3 hover:bg-cyan-600 transition-all duration-200"
              onClick={() => handleShowtimeClick(show.schedule_id)}
            >
              {show.time}
            </button>
          ))}
        </div>
      </div>
    ),
  }));

  if (isInitialLoading) {
    return (
      <div className="mt-6 space-y-8">
        <ScheduleSelectorsSkeleton />
        <CinemaCardGridSkeleton />
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 space-y-4">
        <div className="flex gap-x-2 overflow-x-auto pb-2">
          {cities?.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCityClick(city)}
              className={`flex-shrink-0 cursor-pointer rounded-full py-2 px-5 text-sm transition-all duration-200 ${
                selectedCity === city
                  ? "bg-cyan-500 text-white font-semibold"
                  : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="flex gap-x-3 overflow-x-auto pb-2">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`text-center rounded-lg p-3 w-16 flex-shrink-0 transition-colors ${
                format(selectedDate, "yyyy-MM-dd") ===
                format(date, "yyyy-MM-dd")
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <p className="text-xs uppercase font-semibold">
                {format(date, "E")}
              </p>
              <p className="text-xl font-bold">{format(date, "d")}</p>
            </button>
          ))}
        </div>
      </div>

      {isScheduleLoading ? (
        <CinemaCardGridSkeleton />
      ) : schedules.length > 0 ? (
        <CinemaCardGrid items={cardItems} />
      ) : (
        <div className="text-center text-zinc-400 mt-8 py-10 bg-zinc-800/50 rounded-lg">
          Jadwal tidak tersedia untuk kota dan tanggal yang dipilih.
        </div>
      )}
    </div>
  );
};

export default MovieSchedules;
