import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const MovieForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    description: "",
  });
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        genre: initialData.genre || "",
        duration: initialData.duration || "",
        description: initialData.description || "",
      });
      if (initialData.poster_url) {
        setPosterPreview(
          import.meta.env.VITE_STORAGE_URL + `${initialData.poster_url}`
        );
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (poster) {
      data.append("poster", poster);
    }
    onSubmit(data, initialData ? initialData.id : null);
  };

  const inputClass =
    "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-slate-700 mb-1"
            htmlFor="genre"
          >
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-slate-700 mb-1"
            htmlFor="duration"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className={inputClass}
            required
            min="1"
            max="500"
          />
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className={inputClass}
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Poster
        </label>
        <label
          htmlFor="poster"
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
        >
          <div className="space-y-1 text-center">
            {posterPreview ? (
              <img
                src={posterPreview}
                alt="Poster preview"
                className="mx-auto h-40 w-auto object-contain rounded-md"
              />
            ) : (
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600 justify-center">
              <div className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>{posterPreview ? "Change poster" : "Upload a file"}</span>
                <input
                  id="poster"
                  name="poster"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            {initialData && initialData.poster_url && !poster && (
              <p className="text-xs mt-2 text-gray-500">
                Current poster will be kept if you don't upload a new one.
              </p>
            )}
          </div>
        </label>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Save Movie
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
