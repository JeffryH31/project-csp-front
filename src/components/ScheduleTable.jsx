
import React, { useState, useMemo, useEffect } from 'react';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PencilSquareIcon,
    TrashIcon,
    CalendarDaysIcon,
    VideoCameraIcon,
    BuildingStorefrontIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';


const IMAGE_BASE_URL = "http://127.0.0.1:8000/storage/";

const SortIcon = ({ direction }) => {
    if (direction === 'ascending') return <span className="ml-1">↑</span>;
    if (direction === 'descending') return <span className="ml-1">↓</span>;
    return <span className="ml-1 text-gray-400">↑↓</span>;
};

const FilterSelect = ({ icon, children, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </span>
        <select {...props}>
            {children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </span>
    </div>
);

const FilterDateInput = React.forwardRef(({ value, onClick, icon }, ref) => (
    <div className="relative" onClick={onClick} ref={ref}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </span>
        <input
            type="text"
            value={value}
            readOnly
            className="pl-10 p-2.5 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            placeholder="All Dates"
        />
    </div>
));
FilterDateInput.displayName = 'FilterDateInput';


const ScheduleTable = ({ schedules, movies, cinemas, onEdit, onDelete }) => {
    const [filters, setFilters] = useState({ movie: '', cinema: '', date: '' });
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'show_date', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
        if (formattedDate !== filters.date) {
            setFilters(prev => ({ ...prev, date: formattedDate }));
            setCurrentPage(1);
        }
    }, [selectedDate, filters.date]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const filteredSchedules = useMemo(() => {
        return schedules.filter(schedule =>
            (filters.movie ? schedule.movie_id === filters.movie : true) &&
            (filters.cinema ? schedule.cinema_id === filters.cinema : true) &&
            (filters.date ? schedule.show_date === filters.date : true)
        );
    }, [schedules, filters]);

    const sortedSchedules = useMemo(() => {
        let sortableItems = [...filteredSchedules];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const keyA = sortConfig.key === 'movie' ? a.movie?.title?.toLowerCase() : a[sortConfig.key];
                const keyB = sortConfig.key === 'movie' ? b.movie?.title?.toLowerCase() : b[sortConfig.key];
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
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const totalPages = Math.ceil(sortedSchedules.length / itemsPerPage);

    const commonInputClass = "appearance-none pl-10 pr-10 p-2.5 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <FilterSelect
                    icon={<VideoCameraIcon className="h-5 w-5 text-gray-400" />}
                    name="movie"
                    onChange={handleFilterChange}
                    className={commonInputClass}
                >
                    <option value="">All Movies</option>
                    {movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                </FilterSelect>

                <FilterSelect
                    icon={<BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />}
                    name="cinema"
                    onChange={handleFilterChange}
                    className={commonInputClass}
                >
                    <option value="">All Cinemas</option>
                    {cinemas.map(cinema => <option key={cinema.id} value={cinema.id}>{cinema.name} {cinema.location}</option>)}
                </FilterSelect>

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    isClearable
                    customInput={<FilterDateInput icon={<CalendarDaysIcon className="h-5 w-5 text-gray-400" />} />}
                    dateFormat="d MMMM yyyy"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('movie')}>
                                Movie <SortIcon direction={sortConfig.key === 'movie' ? sortConfig.direction : 'none'} />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cinema & Studio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('show_date')}>
                                Showtime <SortIcon direction={sortConfig.key === 'show_date' ? sortConfig.direction : 'none'} />
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {paginatedSchedules.length > 0 ? (
                            paginatedSchedules.map(schedule => (
                                <tr key={schedule.id} className="border-b border-gray-200 hover:bg-slate-50 transition-colors align-middle">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {schedule.movie?.poster_url && (
                                                <img src={`${IMAGE_BASE_URL}${schedule.movie.poster_url}`} alt={schedule.movie.title} className="h-14 w-10 object-cover rounded-md shadow mr-4" />
                                            )}
                                            <span className="font-semibold text-sm text-slate-900">{schedule.movie?.title || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-800">{schedule.cinema?.name || 'N/A'}</div>
                                        <div className="text-xs text-slate-500">{schedule.cinema?.location || 'N/A'} - Studio {schedule.studio_number}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-sm text-slate-800">{format(new Date(schedule.show_date), 'eeee, d MMMM yyyy', { locale: id })}</div>
                                        <div className="text-sm text-slate-500">{schedule.show_time.substring(0, 5)} WIB</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => onEdit(schedule)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                                            >
                                                <PencilSquareIcon className="h-4 w-4" />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => onDelete(schedule.id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-12">
                                    <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-300" />
                                    <h3 className="mt-2 text-sm font-semibold text-gray-800">No schedules found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{paginatedSchedules.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-semibold text-gray-700">{Math.min(currentPage * itemsPerPage, sortedSchedules.length)}</span> of <span className="font-semibold text-gray-700">{sortedSchedules.length}</span> results
                </span>
                <div className="flex items-center space-x-1">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 text-gray-500 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronLeftIcon className="h-5 w-5" /></button>
                    <span className="text-sm text-gray-700 px-2">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 text-gray-500 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRightIcon className="h-5 w-5" /></button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleTable;