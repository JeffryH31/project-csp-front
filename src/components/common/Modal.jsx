import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-black text-2xl font-bold">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;