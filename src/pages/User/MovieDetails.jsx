// Movie_Detail.js (Versi Sederhana tanpa Jadwal)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";
import MovieSchedules from "../../components/movies/MovieSchedules";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("schedule");
  const instance = AxiosInstance();

  const LARAVEL_BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

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

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const tabs = [
    {
      id: "schedule",
      label: "Schedule",
      content: <MovieSchedules movie_id={id} />,
    },
    {
      id: "details",
      label: "Details",
      content: movie?.description || "Description is not available",
    },
  ];

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
              src={`${import.meta.env.VITE_API_BASE_URL}/storage/${
                movie.poster_url
              }`}
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
          <div className="synopsis flex gap-4 border-b border-gray-500">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500 hover:text-blue-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="text-zinc-300 leading-relaxed my-2">
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
