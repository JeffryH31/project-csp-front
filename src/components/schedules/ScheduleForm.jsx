import React, { useState, useEffect } from 'react';

import {
    PlusIcon,
    XMarkIcon,
    VideoCameraIcon,
    BuildingStorefrontIcon,
    ChevronDownIcon,
    CalendarDaysIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { format } from 'date-fns';
import FilterSelect from '../common/FilterSelect';

const CustomFormInput = React.forwardRef(({ value, onClick, icon, placeholder }, ref) => (
    <div className="relative" onClick={onClick} ref={ref}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</span>
        <input
            type="text"
            value={value}
            readOnly
            className="pl-10 p-2.5 w-full border border-slate-300 rounded-md text-sm shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            placeholder={placeholder}
        />
    </div>
));
CustomFormInput.displayName = 'CustomFormInput';


const ScheduleForm = ({ initialData, moviesList, cinemasList, onSubmit, onCancel }) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        movie_id: '',
        cinema_id: '',
        studio_number: '',
        show_date: '',
        show_time: '',
    });

    const [showDates, setShowDates] = useState([]);
    const [showTimes, setShowTimes] = useState([]);

    const [currentDate, setCurrentDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                movie_id: initialData.movie_id || '',
                cinema_id: initialData.cinema_id || '',
                studio_number: initialData.studio_number || '',
                show_date: initialData.show_date || '',
                show_time: initialData.show_time?.slice(0, 5) || '',
            });
        }
    }, [initialData, isEditing]);

    const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const addDate = () => {
        if (currentDate) {
            const formatted = format(currentDate, 'yyyy-MM-dd');
            if (!showDates.includes(formatted)) {
                setShowDates([...showDates, formatted].sort());
            }
            setCurrentDate(null);
        }
    };
    const addTime = () => {
        if (currentTime) {
            const formatted = format(currentTime, 'HH:mm');
            if (!showTimes.includes(formatted)) {
                setShowTimes([...showTimes, formatted].sort());
            }
            setCurrentTime(null);
        }
    };

    const removeDate = index => setShowDates(showDates.filter((_, i) => i !== index));
    const removeTime = index => setShowTimes(showTimes.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = isEditing ? { ...formData } : {
            movie_id: formData.movie_id,
            cinema_id: formData.cinema_id,
            studio_number: formData.studio_number,
            show_dates: showDates,
            show_times: showTimes
        };
        onSubmit(payload, initialData?.id);
    };

    const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const selectClass = `appearance-none pl-10 pr-10 ${inputClass}`;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="movie_id">Movie</label>
                <FilterSelect icon={<VideoCameraIcon className="h-5 w-5 text-gray-400" />} name="movie_id" id="movie_id" value={formData.movie_id} onChange={handleChange} required className={selectClass}>
                    <option value="">Select a Movie</option>
                    {moviesList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                </FilterSelect>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="cinema_id">Cinema</label>
                    <FilterSelect icon={<BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />} name="cinema_id" id="cinema_id" value={formData.cinema_id} onChange={handleChange} required className={selectClass}>
                        <option value="">Select a Cinema</option>
                        {cinemasList.map(cinema => <option key={cinema.id} value={cinema.id}>{cinema.name} {cinema.location}</option>)}
                    </FilterSelect>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="studio_number">Studio Number</label>
                    <input type="number" name="studio_number" id="studio_number" value={formData.studio_number} onChange={handleChange} required className={inputClass} />
                </div>
            </div>

            {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Show Date</label>
                        <DatePicker
                            selected={formData.show_date ? new Date(formData.show_date) : null}
                            onChange={date => setFormData(prev => ({ ...prev, show_date: format(date, 'yyyy-MM-dd') }))}
                            customInput={<CustomFormInput icon={<CalendarDaysIcon className="h-5 w-5 text-gray-400" />} placeholder="Select date" />}
                            dateFormat="d MMMM yyyy"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Show Time</label>
                        <DatePicker
                            selected={formData.show_time ? new Date(`1970-01-01T${formData.show_time}`) : null}
                            onChange={date => setFormData(prev => ({ ...prev, show_time: format(date, 'HH:mm') }))}
                            customInput={<CustomFormInput icon={<ClockIcon className="h-5 w-5 text-gray-400" />} placeholder="Select time" />}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Show Dates</label>
                        <div className="flex items-center">
                            <DatePicker
                                selected={currentDate}
                                onChange={date => setCurrentDate(date)}
                                customInput={<CustomFormInput icon={<CalendarDaysIcon className="h-5 w-5 text-gray-400" />} placeholder="Pick a date to add" />}
                                dateFormat="d MMMM yyyy"
                                wrapperClassName="w-full flex-grow"
                            />
                            <button type="button" onClick={addDate} className="ml-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"><PlusIcon className="h-5 w-5" /></button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 empty:mt-0">
                            {showDates.map((date, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {date}
                                    <button type="button" onClick={() => removeDate(i)} className="ml-1.5 p-0.5 rounded-full text-blue-500 hover:bg-blue-200"><XMarkIcon className="h-3 w-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Show Times (24h format)</label>
                        <div className="flex items-center">
                            <DatePicker
                                selected={currentTime}
                                onChange={date => setCurrentTime(date)}
                                customInput={<CustomFormInput icon={<ClockIcon className="h-5 w-5 text-gray-400" />} placeholder="Pick a time to add" />}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                wrapperClassName="w-full flex-grow"
                            />
                            <button type="button" onClick={addTime} className="ml-2 px-3 py-2 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200"><PlusIcon className="h-5 w-5" /></button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 empty:mt-0">
                            {showTimes.map((time, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                                    {time}
                                    <button type="button" onClick={() => removeTime(i)} className="ml-1.5 p-0.5 rounded-full text-teal-500 hover:bg-teal-200"><XMarkIcon className="h-3 w-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className="flex items-center justify-end pt-6 border-t border-gray-200 space-x-3">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
                    {isEditing ? 'Update Schedule' : 'Create Schedules'}
                </button>
            </div>
        </form>
    );
};

export default ScheduleForm;