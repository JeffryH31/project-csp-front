import React, { useEffect, useState } from "react";
import Accordion from "../common/Accordion";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../helper/AxiosInstance";
import AccordionSkeleton from "../schedules/AccordionSkeleton";
import { useNavigate } from "react-router-dom";

const MovieSchedules = ({ movie_id }) => {
  const [cities, setCities] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const instance = AxiosInstance();

  const navigate = useNavigate();

  const handleShowtimeClick = (scheduleId) => {
    navigate(`/seats/${scheduleId}`);
  };

  const fetchMovieCities = async () => {
    try {
      const res = await instance.get(`/movie-cities/${movie_id}`);
      const availableCities = res.data.data;
      setCities(availableCities);
      if (availableCities.length > 0) {
        handleCityClick(availableCities[0], true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal memuat kota");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const fetchSchedules = async (city) => {
    try {
      const res = await instance.get(`/schedules/${movie_id}/${city}`);
      setSchedules(res.data.data);
    } catch (error) {
      setSchedules([]);
      toast.error(
        error?.response?.data?.message || `Gagal memuat jadwal untuk ${city}`
      );
    } finally {
      setIsScheduleLoading(false);
    }
  };

  const handleCityClick = (city, isInitial = false) => {
    if (selectedCity === city && !isInitial) return;

    setSelectedCity(city);
    setIsScheduleLoading(true);
    fetchSchedules(city);
  };

  useEffect(() => {
    setIsInitialLoading(true);
    fetchMovieCities();
  }, [movie_id]);

  const accordionItems = schedules.map((cinema) => ({
    title: cinema.name,
    content: (
      <div>
        <p className="font-semibold text-white mb-2">Regular 2D</p>
        <p className="text-lg text-cyan-400 font-bold mb-4">
          Rp {cinema.price.toLocaleString("id-ID")}
        </p>
        <div className="grid grid-cols-4 gap-2">
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
      <>
        <div className="flex gap-x-2 mb-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 bg-gray-700 rounded-full w-24"
            ></div>
          ))}
        </div>
        <AccordionSkeleton />
      </>
    );
  }

  return (
    <>
      <div className="flex gap-x-2 mb-4 overflow-x-auto pb-2">
        {cities?.map((city, index) => (
          <div
            key={`city${index}`}
            onClick={() => handleCityClick(city)}
            className={`cursor-pointer whitespace-nowrap rounded-full py-2 px-4 transition-all duration-200 ${
              selectedCity === city
                ? "bg-cyan-500 text-white font-semibold"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {city}
          </div>
        ))}
      </div>

      {isScheduleLoading ? (
        <AccordionSkeleton />
      ) : schedules.length > 0 ? (
        <Accordion items={accordionItems} />
      ) : (
        <div className="text-center text-gray-400 mt-8 py-10">
          Jadwal tidak tersedia untuk kota yang dipilih.
        </div>
      )}
    </>
  );
};

export default MovieSchedules;
