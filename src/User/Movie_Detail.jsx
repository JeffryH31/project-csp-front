import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Movie_Detail = () => {
    const { id } = useParams(); // ✅ First: get id from URL
    const [movie, setMovie] = useState(null); // ✅ Second: declare state

    useEffect(() => {
        axios.get(`http://localhost:8000/api/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Fetch error:', error));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Genre: {movie.genre}</p>
            <img src={`http://localhost:8000/storage/${movie.poster}`} alt={movie.title} />
        </div>
    );
};

export default Movie_Detail;
