import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

export default function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/movies')  // Ganti dengan alamat API backend Laravel kamu
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-10 px-4 bg-white text-center">Loading movies...</div>;
  }

  return (
    <div className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 ">NOW SHOWING IN CINEMAS</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="w-full text-center">
              <img
                src={`http://localhost:8000/storage/${movie.poster_url}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
              <p className="font-semibold mt-2 text-xl">{movie.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
