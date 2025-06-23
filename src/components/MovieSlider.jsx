import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.data || data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 px-4">
        <div className="h-8 w-1/3 bg-zinc-800 rounded-md animate-pulse mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-[500px] bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-6 bg-zinc-800 rounded-md animate-pulse w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tambahkan pemeriksaan jika movies bukan array untuk mencegah error
  if (!Array.isArray(movies)) {
    return <div className="py-12 text-white">Gagal memuat data film.</div>;
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">Now Showing</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        modules={[Navigation]}
        className="movie-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <div className="w-full text-left group cursor-pointer">
                <div className="overflow-hidden rounded-lg shadow-lg border-2 border-transparent group-hover:border-cyan-500 transition-all duration-300">
                  <img
                    src={import.meta.env.VITE_STORAGE_URL+`${movie.poster_url}`}
                    alt={movie.title}
                    className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg mt-4 text-white truncate group-hover:text-cyan-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-sm text-zinc-400">{movie.genre}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
