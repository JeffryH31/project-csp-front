
import React, { useState, useMemo } from 'react';

const SortIcon = ({ direction }) => {
    if (direction === 'ascending') return <span className="ml-1">↑</span>;
    if (direction === 'descending') return <span className="ml-1">↓</span>;
    return <span className="ml-1 text-gray-400">↑↓</span>;
};

const ScheduleTable = ({ schedules, movies, cinemas, onEdit, onDelete }) => {
    const [filters, setFilters] = useState({ movie: '', cinema: '', date: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'show_date', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const filteredSchedules = useMemo(() => {
        return schedules.filter(schedule => {
            return (
                (filters.movie ? schedule.movie_id === filters.movie : true) &&
                (filters.cinema ? schedule.cinema_id === filters.cinema : true) &&
                (filters.date ? schedule.show_date === filters.date : true)
            );
        });
    }, [schedules, filters]);

    const sortedSchedules = useMemo(() => {
        let sortableItems = [...filteredSchedules];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const keyA = sortConfig.key === 'movie' ? a.movie.title.toLowerCase() : a[sortConfig.key];
                const keyB = sortConfig.key === 'movie' ? b.movie.title.toLowerCase() : b[sortConfig.key];

                if (keyA < keyB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (keyA > keyB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredSchedules, sortConfig]);

    const paginatedSchedules = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedSchedules.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedSchedules, currentPage, itemsPerPage]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalPages = Math.ceil(sortedSchedules.length / itemsPerPage);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 py-4 rounded-lg">
                <select name="movie" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md">
                    <option value="">All Movies</option>
                    {movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                </select>
                <select name="cinema" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md">
                    <option value="">All Cinemas</option>
                    {cinemas.map(cinema => <option key={cinema.id} value={cinema.id}>{cinema.name} {cinema.location}</option>)}
                </select>
                <input type="date" name="date" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md" />
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" onClick={() => requestSort('movie')}>Movie <SortIcon direction={sortConfig.key === 'movie' ? sortConfig.direction : 'none'} /></th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Cinema / Studio</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" onClick={() => requestSort('show_date')}>Date <SortIcon direction={sortConfig.key === 'show_date' ? sortConfig.direction : 'none'} /></th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left cursor-pointer" onClick={() => requestSort('show_time')}>Time <SortIcon direction={sortConfig.key === 'show_time' ? sortConfig.direction : 'none'} /></th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedSchedules.map(schedule => (
                            <tr key={schedule.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4 font-medium">{schedule.movie?.title || 'N/A'}</td>
                                <td className="py-3 px-4">{schedule.cinema?.name || 'N/A'} {schedule.cinema?.location || 'N/A'} - Studio {schedule.studio_number}</td>
                                <td className="py-3 px-4">{schedule.show_date}</td>
                                <td className="py-3 px-4">{schedule.show_time.substring(0, 5)}</td>
                                <td className="py-3 px-4 text-center">
                                    <button onClick={() => onEdit(schedule)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                                    <button onClick={() => onDelete(schedule.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Showing {paginatedSchedules.length} of {sortedSchedules.length} schedules
                </span>
                <div className="flex items-center">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md mr-2 disabled:opacity-50">Prev</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md ml-2 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleTable;