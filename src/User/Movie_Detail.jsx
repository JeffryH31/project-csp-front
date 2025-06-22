import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// --- PENTING: Ganti URL ini dengan URL backend Laravel Anda ---
const LARAVEL_BACKEND_URL = 'http://127.0.0.1:8000';

// ====================================================================
// Komponen Kecil untuk bagian UI yang spesifik
// ====================================================================

// Komponen untuk Banner Film di bagian atas
const MovieBanner = ({ movie }) => (
    <div className="bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Kolom Kiri: Poster */}
        <div className="flex-shrink-0 w-full md:w-1/4">
            <img
                src={`${LARAVEL_BACKEND_URL}/storage/${movie.poster_url}`}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
            />
        </div>

        {/* Kolom Kanan: Informasi Film */}
        <div className="flex-grow text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-gray-300">
                <span>{movie.genre}</span>
                <span className="hidden md:inline">|</span>
                <span>{movie.duration} Minutes</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="border border-gray-500 text-gray-300 text-sm font-semibold px-3 py-1 rounded">R13+</span>
                <span className="border border-gray-500 text-gray-300 text-sm font-semibold px-3 py-1 rounded">2D</span>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors">
                Lihat Trailer
            </button>
        </div>
    </div>
);

// Komponen untuk Konten Detail Film
const MovieInfo = ({ movie }) => {
    // Fungsi untuk mendapatkan inisial dari nama
    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    // Asumsi data cast ada di dalam movie.casts (array of objects)
    const casts = movie.casts || [];

    return (
        // Menambahkan margin atas untuk memberi jarak dari banner
        <div className="text-white mt-8">
            {/* Sinopsis */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">SINOPSIS</h3>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            {/* Produksi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div><strong className="block text-gray-400">PRODUSER</strong> {movie.producer || 'N/A'}</div>
                <div><strong className="block text-gray-400">SUTRADARA</strong> {movie.director || 'N/A'}</div>
                <div><strong className="block text-gray-400">PENULIS</strong> {movie.writer || 'N/A'}</div>
                <div><strong className="block text-gray-400">PRODUKSI</strong> {movie.production || 'N/A'}</div>
            </div>

            {/* Pemeran */}
            <div>
                <h3 className="text-xl font-bold mb-4">PEMERAN</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {casts.map((cast, index) => (
                        <div key={index} className="text-center">
                            <div className="w-20 h-20 mx-auto bg-zinc-700 rounded-full flex items-center justify-center mb-2">
                                <span className="text-2xl font-bold text-gray-300">{getInitials(cast.name)}</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-200">{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// ====================================================================
// Komponen Utama yang akan di-export
// ====================================================================

const Movie_Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            setError('');
            try {
                const movieRes = await axios.get(`/api/movies/${id}`);
                if (movieRes.data && movieRes.data.success) {
                    setMovie(movieRes.data.data);
                } else {
                    throw new Error('Film tidak ditemukan');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Gagal memuat data. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white text-lg">
                Memuat Detail Film...
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-red-500 text-lg">
                {error || 'Data film tidak tersedia.'}
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                <MovieBanner movie={movie} />
                <MovieInfo movie={movie} />
            </div>
        </div>
    );
};

export default Movie_Detail;