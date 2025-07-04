import axios from 'axios';
import { AxiosInstance } from '../helper/AxiosInstance';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json'
    }
});

const instance = AxiosInstance();

export const showSwal = (title, message, icon) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
    });
};

export const showValidationErrors = (error) => {
    const errorList = error.response.data.error;

    if (errorList) {
        const errorMessages = Object.values(errorList).flat();
        const formattedErrors = errorMessages.join('<br>');
        Swal.fire({
            title: 'Oops!',
            html: formattedErrors,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        });
    }   
};

export const getMovieLocations = async (props) => {
    const response = await instance.get(`movie-locations/${props.movie_id}`)
    const data = response.data;
    return data;
};

export default apiClient;