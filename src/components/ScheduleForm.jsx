import React, { useState, useEffect } from 'react';

const ScheduleForm = ({ initialData, moviesList, cinemasList, onSubmit, onCancel }) => {
    const isEditing = !!initialData;

    const [baseData, setBaseData] = useState({
        movie_id: '',
        cinema_id: '',
        studio_number: '',
    });

    const [showDates, setShowDates] = useState([]);
    const [showTimes, setShowTimes] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const [editData, setEditData] = useState({
        show_date: '',
        show_time: '',
    });

    useEffect(() => {
        if (isEditing) {
            const formattedDate = initialData.show_date?.slice(0, 10);
            const formattedTime = initialData.show_time?.slice(0, 5);

            setBaseData({
                movie_id: initialData.movie_id,
                cinema_id: initialData.cinema_id,
                studio_number: initialData.studio_number,
            });

            setEditData({
                show_date: formattedDate,
                show_time: formattedTime,
            });
        }
    }, [initialData, isEditing]);


    const handleBaseChange = e => setBaseData({ ...baseData, [e.target.name]: e.target.value });
    const handleEditChange = e => setEditData({ ...editData, [e.target.name]: e.target.value });

    const addDate = () => {
        if (currentDate && !showDates.includes(currentDate)) setShowDates([...showDates, currentDate]);
        setCurrentDate('');
    };
    const addTime = () => {
        if (currentTime && !showTimes.includes(currentTime)) setShowTimes([...showTimes, currentTime]);
        setCurrentTime('');
    };
    const removeDate = index => setShowDates(showDates.filter((_, i) => i !== index));
    const removeTime = index => setShowTimes(showTimes.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload;
        if (isEditing) {
            payload = { ...baseData, ...editData };
        } else {
            payload = { ...baseData, show_dates: showDates, show_times: showTimes };
        }
        onSubmit(payload, initialData?.id);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Movie</label>
                <select name="movie_id" value={baseData.movie_id} onChange={handleBaseChange} required className="p-2 border rounded w-full">
                    <option value="">Select a Movie</option>
                    {moviesList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Cinema</label>
                <select name="cinema_id" value={baseData.cinema_id} onChange={handleBaseChange} required className="p-2 border rounded w-full">
                    <option value="">Select a Cinema</option>
                    {cinemasList.map(cinema => <option key={cinema.id} value={cinema.id}>{cinema.name} {cinema.location}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Studio Number</label>
                <input type="number" name="studio_number" value={baseData.studio_number} onChange={handleBaseChange} required className="p-2 border rounded w-full" />
            </div>

            {isEditing ? (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Show Date</label>
                        <input type="date" name="show_date" value={editData.show_date} onChange={handleEditChange} required className="p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Show Time</label>
                        <input type="time" name="show_time" value={editData.show_time} onChange={handleEditChange} required className="p-2 border rounded w-full" />
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-4 p-3 border rounded">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Show Dates</label>
                        <div className="flex">
                            <input type="date" value={currentDate} onChange={e => setCurrentDate(e.target.value)} className="p-2 border rounded-l w-full" />
                            <button type="button" onClick={addDate} className="bg-indigo-500 text-white p-2 rounded-r">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {showDates.map((date, i) => <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center">{date} <button type="button" onClick={() => removeDate(i)} className="ml-2 text-red-500 font-bold">x</button></span>)}
                        </div>
                    </div>
                    <div className="mb-4 p-3 border rounded">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Show Times (24h format)</label>
                        <div className="flex">
                            <input type="time" value={currentTime} onChange={e => setCurrentTime(e.target.value)} className="p-2 border rounded-l w-full" />
                            <button type="button" onClick={addTime} className="bg-teal-500 text-white p-2 rounded-r">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {showTimes.map((time, i) => <span key={i} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full flex items-center">{time} <button type="button" onClick={() => removeTime(i)} className="ml-2 text-red-500 font-bold">x</button></span>)}
                        </div>
                    </div>
                </>
            )}

            <div className="flex justify-end mt-6">
                <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
                <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>{isEditing ? 'Update Schedule' : 'Create Schedules'}</button>
            </div>
        </form>
    );
};

export default ScheduleForm;