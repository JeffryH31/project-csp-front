// Movie_Detail.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Movie_Detail = () => {
    const API_BASE_URL = '/api/movies';
    const { id } = useParams();
    const [movie, setMovie] = useState(null); // This will hold the actual movie object

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/${id}`);
                console.log('Full API response (res.data):', res.data); // Log the whole response from axios

                if (res.data && res.data.success && res.data.data) {
                    // ✅ CORRECTED: Set the movie state to the nested 'data' object
                    setMovie(res.data.data);
                    console.log('Actual movie data being set to state:', res.data.data);
                } else {
                    console.error('Movie data not found in expected format:', res.data);
                    // Optionally set an error state here
                }
            } catch (error) {
                console.error('Fetch error:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                }
            }
        };
        fetchMovie();
    }, [id]);

    // This useEffect is good for debugging the 'movie' state itself
    useEffect(() => {
        if (movie) {
            console.log('Movie state updated to:', movie);
            console.log('Movie poster value from state:', movie.poster);
        }
    }, [movie]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    // Now, movie.title, movie.description, movie.poster etc., should work,
    // assuming these fields exist within the 'res.data.data' object from your API.
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Genre: {movie.genre}</p>
            {/* Check if movie.poster has a value before rendering the img tag */}
            {movie.poster ? (
                <img src={`/laravel_storage/${movie.poster}`} alt={movie.title} />
            ) : (
                <p>No poster available</p>
            )}
        </div>
    );
};

export default Movie_Detail;