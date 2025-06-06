import React, { useState, useEffect } from 'react';
import MovieTable from '../components/MovieTable';
import MovieForm from '../components/MovieForm';
import apiClient, { showSwal, showValidationErrors } from '../api/api';
import { PlusIcon } from '@heroicons/react/24/solid';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/movies');
            setMovies(response.data);
        } catch (error) {
            showSwal('Error!', 'Could not fetch movies.', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleOpenModal = (movie = null) => {
        setEditingMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setEditingMovie(null);
        setShowModal(false);
    };


    const handleSaveMovie = async (formData, id) => {
        const isUpdating = !!id;
        const url = isUpdating ? `/movies/${id}` : '/movies';

        if (isUpdating) {
            formData.append('_method', 'PUT');
        }

        try {
            const response = await apiClient.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            showSwal('Success!', response.data.message, 'success');
            fetchMovies();
            handleCloseModal();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                showValidationErrors(error);
            } else {
                showSwal('Error!', isUpdating ? 'Failed to update movie.' : 'Failed to create movie.', 'error');
            }
            console.error(error);
        }
    };

    const handleDeleteMovie = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiClient.delete(`/movies/${id}`);
                    showSwal('Deleted!', response.data.message, 'success');
                    fetchMovies();
                } catch (error) {
                    showSwal('Error!', 'Failed to delete movie.', 'error');
                    console.error(error);
                }
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Movies</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Movie
                </button>
            </div>

            {loading ? <p>Loading...</p> : <MovieTable movies={movies} onEdit={handleOpenModal} onDelete={handleDeleteMovie} />}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-xl font-semibold">{editingMovie ? 'Edit Movie' : 'Add Movie'}</h2>
                            <button onClick={handleCloseModal} className="text-black text-2xl font-bold">&times;</button>
                        </div>
                        <MovieForm
                            initialData={editingMovie}
                            onSubmit={handleSaveMovie}
                            onCancel={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoviesPage;