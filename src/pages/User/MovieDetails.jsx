import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";
import MovieSchedules from "../../components/movies/MovieSchedules";
import MovieDetailSkeleton from "../../components/skeletons/MovieDetailSkeleton";

const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-1 py-2 text-md font-semibold transition-colors duration-300 ${
      isActive ? "text-white" : "text-zinc-400 hover:text-white"
    }`}
  >
    {label}
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-full" />
    )}
  </button>
);

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("schedule");
  const navigate = useNavigate();
  const instance = AxiosInstance();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/movies/${id}`);
        setMovie(res.data.data);
      } catch (err) {
        toast.error("Gagal memuat detail film.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white">
        Film tidak ditemukan.
      </div>
    );
  }

  const tabs = [
    {
      id: "schedule",
      label: "Schedule",
      content: <MovieSchedules movie_id={id} />,
    },
    {
      id: "details",
      label: "Details",
      content: (
        <p className="text-zinc-300 leading-relaxed pt-6">
          {movie.description}
        </p>
      ),
    },
  ];

  return (
    <div className="aurora-background min-h-screen pb-48 text-white">
      <div className="relative w-full h-80 md:h-[60vh]">
        <img
          src={import.meta.env.VITE_STORAGE_URL + `${movie.poster_url}`}
          alt="Movie Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 -mt-40 md:-mt-56 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
          <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0">
            <img
              src={import.meta.env.VITE_STORAGE_URL + `${movie.poster_url}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-xl shadow-2xl shadow-black/50"
            />
          </div>

          <div className="flex-grow pt-4 md:pt-20 text-center md:text-left">
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-cyan-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                  </svg>
                </span>
                {movie.genre}
              </div>
              <div className="flex items-center gap-2 text-sm bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-cyan-400">
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
                </span>
                {movie.duration} Minutes
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border-b border-zinc-700 flex space-x-8">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
          <div className="mt-4">
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
