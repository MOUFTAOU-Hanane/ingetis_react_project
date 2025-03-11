import React from 'react';
import { toast } from 'react-toastify';

interface ConfirmationModalProps {
    isOpen: boolean;
    eventId: number | null;
    onClose: () => void;
    onConfirm: (eventId: number) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, eventId, onClose, onConfirm }) => {
    if (!isOpen) return null; // Si le modal n'est pas ouvert, on ne l'affiche pas

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold text-center mb-4">Veux-tu vraiment t'inscrire à cet événement ?</h2>
                <div className="flex justify-around">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={() => {
                            if (eventId) {
                                onConfirm(eventId);
                            }
                        }}
                    >
                        OUI
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={onClose}
                    >
                        NON
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
