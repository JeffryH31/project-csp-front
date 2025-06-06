import React, { useState, useEffect } from 'react';
import apiClient, { showSwal, showValidationErrors } from '../api/api';

import ScheduleTable from '../components/ScheduleTable';
import ScheduleForm from '../components/ScheduleForm';

const SchedulesPage = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [moviesList, setMoviesList] = useState([]);
    const [cinemasList, setCinemasList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [schedulesRes, moviesRes, cinemasRes] = await Promise.all([
                apiClient.get('/schedules'),
                apiClient.get('/movies'),
                apiClient.get('/cinemas')
            ]);
            setSchedules(schedulesRes.data);
            setMoviesList(moviesRes.data);
            setCinemasList(cinemasRes.data);
        } catch (error) {
            showSwal('Error!', 'Could not fetch required data.', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (schedule = null) => {
        setEditingSchedule(schedule);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setEditingSchedule(null);
        setShowModal(false);
    };

    const handleSaveSchedule = async (formData, id) => {
        const isUpdating = !!id;
        const url = isUpdating ? `/schedules/${id}` : '/schedules';
        const method = isUpdating ? 'put' : 'post';

        try {
            const response = await apiClient[method](url, formData);
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
            });
            fetchData(); // Refresh data
            handleCloseModal();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                showValidationErrors(error);
            } else {
                showSwal('Error!', isUpdating ? 'Failed to update schedule.' : 'Failed to create schedule.', 'error');
            }
            console.error(error);
        }
    };

    const handleDeleteSchedule = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiClient.delete(`/schedules/${id}`);
                    showSwal('Deleted!', response.data.message, 'success');
                    fetchData(); // Refresh data
                } catch (error) {
                    showSwal('Error!', 'Failed to delete schedule.', 'error');
                }
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Schedules</h1>
                <button onClick={() => handleOpenModal()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    + Add Schedule
                </button>
            </div>

            {loading ? (
                <p>Loading data...</p>
            ) : (
                <ScheduleTable 
                    schedules={schedules}
                    movies={moviesList}
                    cinemas={cinemasList}
                    onEdit={handleOpenModal} 
                    onDelete={handleDeleteSchedule} 
                />
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-xl font-semibold">{editingSchedule ? 'Edit Schedule' : 'Add New Schedules'}</h2>
                            <button onClick={handleCloseModal} className="text-black text-2xl font-bold">&times;</button>
                        </div>
                        <ScheduleForm
                            initialData={editingSchedule}
                            moviesList={moviesList}
                            cinemasList={cinemasList}
                            onSubmit={handleSaveSchedule}
                            onCancel={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulesPage;