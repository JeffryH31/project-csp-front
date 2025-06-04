import React, { useState, useMemo } from 'react';

const IMAGE_BASE_URL = "http://127.0.0.1:8000/storage/";

const SortIcon = ({ direction }) => {
    if (direction === 'ascending') return <span className="ml-1">↑</span>;
    if (direction === 'descending') return <span className="ml-1">↓</span>;
    return <span className="ml-1 text-gray-400">↑↓</span>;
};

const MovieTable = ({ movies, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredMovies = useMemo(() => {
        if (!searchTerm) {
            return movies;
        }
        return movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [movies, searchTerm]);

    // 2. Urutkan data berdasarkan sortConfig
    const sortedMovies = useMemo(() => {
        let sortableItems = [...filteredMovies];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredMovies, sortConfig]);

    const paginatedMovies = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedMovies.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedMovies, currentPage, itemsPerPage]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); 
    };

    const truncateText = (text, length) => {
        if (!text) return '-';
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">Show:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Search title or genre..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); 
                    }}
                    className="p-2 border border-gray-300 rounded-md w-1/3"
                />
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Poster</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer hover:bg-gray-700" onClick={() => requestSort('title')}>
                                Title <SortIcon direction={sortConfig.key === 'title' ? sortConfig.direction : 'none'} />
                            </th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer hover:bg-gray-700" onClick={() => requestSort('genre')}>
                                Genre <SortIcon direction={sortConfig.key === 'genre' ? sortConfig.direction : 'none'} />
                            </th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer hover:bg-gray-700" onClick={() => requestSort('duration')}>
                                Duration <SortIcon direction={sortConfig.key === 'duration' ? sortConfig.direction : 'none'} />
                            </th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Description</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedMovies.length > 0 ? (
                            paginatedMovies.map(movie => (
                                <tr key={movie.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">
                                        {movie.poster_url && <img src={`${IMAGE_BASE_URL}${movie.poster_url}`} alt={movie.title} className="h-16 w-12 object-cover rounded" />}
                                    </td>
                                    <td className="py-3 px-4 font-medium">{movie.title}</td>
                                    <td className="py-3 px-4">{movie.genre}</td>
                                    <td className="py-3 px-4">{movie.duration} min</td>
                                    <td className="py-3 px-4 text-sm">{truncateText(movie.description, 50)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button onClick={() => onEdit(movie)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                                        <button onClick={() => onDelete(movie.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">No movies found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Showing {paginatedMovies.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, sortedMovies.length)} of {sortedMovies.length} results
                </span>
                <div className="flex items-center">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1 border rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieTable;