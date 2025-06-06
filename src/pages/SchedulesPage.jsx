import React, { useState, useEffect } from 'react';
import apiClient, { showSwal, showValidationErrors } from '../api/api';
import { PlusIcon } from '@heroicons/react/24/solid';

import ScheduleTable from '../components/schedules/ScheduleTable';
import ScheduleForm from '../components/schedules/ScheduleForm';
import Modal from '../components/common/Modal';

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
            fetchData();
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
                    fetchData();
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
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Movie
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


            <Modal show={showModal} onClose={handleCloseModal} title={editingSchedule ? 'Edit Schedule' : 'Add New Schedules'}>
                <ScheduleForm
                    initialData={editingSchedule}
                    moviesList={moviesList}
                    cinemasList={cinemasList}
                    onSubmit={handleSaveSchedule}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default SchedulesPage;