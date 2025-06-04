import React, { useState, useEffect } from 'react';

const MovieForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        description: '',
    });
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                genre: initialData.genre || '',
                duration: initialData.duration || '',
                description: initialData.description || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setPoster(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (poster) {
            data.append('poster', poster);
        }
        onSubmit(data, initialData ? initialData.id : null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre</label>
                <input type="text" name="genre" id="genre" value={formData.genre} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Duration (minutes)</label>
                <input type="number" name="duration" id="duration" value={formData.duration} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required min="1" max="500" />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="poster">Poster</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg" name="poster" id="poster" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {initialData && initialData.poster_url && !poster && <p className="text-sm mt-2 text-gray-500">Current poster will be kept if you don't upload a new one.</p>}
            </div>

            <div className="flex items-center justify-end">
                <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Cancel
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Save Movie
                </button>
            </div>
        </form>
    );
};

export default MovieForm;