// Movie_Detail.js (Versi Sederhana tanpa Jadwal)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Movie_Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- PENTING: Ganti URL ini dengan URL backend Laravel Anda ---
  const LARAVEL_BACKEND_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    // Nama fungsi diubah karena hanya mengambil data film
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        // Hanya mengambil data detail film, bagian jadwal dihapus
        const movieRes = await axios.get(`/api/movies/${id}`);
        if (movieRes.data && movieRes.data.success) {
          setMovie(movieRes.data.data);
        } else {
          throw new Error("Film tidak ditemukan");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]); // Dependency tetap [id]

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white text-2xl">
        Memuat detail film...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-red-400 text-2xl">
        {error}
      </div>
    );
  }

  // Jika movie belum ada setelah loading selesai (misal karena error tapi tidak tertangkap)
  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
        Data film tidak tersedia.
      </div>
    );
  }

  return (
    // Container utama
    <div className="bg-zinc-900 text-white min-h-screen p-4 md:p-10 font-sans">
      {/* Kartu Detail Film */}
      <div className="bg-zinc-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Kolom Kiri: Poster */}
        <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 mx-auto">
          {movie.poster_url ? (
            <img
              src={`${LARAVEL_BACKEND_URL}/storage/${movie.poster_url}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-[450px] bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400">
              No Poster Available
            </div>
          )}
        </div>

        {/* Kolom Kanan: Informasi Film */}
        <div className="flex-grow">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-zinc-700 text-zinc-300 text-sm font-semibold px-4 py-2 rounded-full">
              {movie.genre}
            </span>
            <span className="bg-zinc-700 text-zinc-300 text-sm font-semibold px-4 py-2 rounded-full">
              {movie.duration} Minutes
            </span>
          </div>
          <div className="synopsis">
            <h3 className="text-lg font-semibold uppercase border-l-4 border-yellow-500 pl-3 mb-3">
              Synopsis
            </h3>
            <p className="text-zinc-300 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>

      {/* BAGIAN JADWAL TAYANG SUDAH DIHAPUS DARI SINI */}
    </div>
  );
};

export default Movie_Detail;
