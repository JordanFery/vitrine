// components/Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg sm:w-1/2">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-xl font-bold">X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
