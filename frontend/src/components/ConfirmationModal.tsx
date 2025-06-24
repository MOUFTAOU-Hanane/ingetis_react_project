import React from "react";
import { toast } from "react-toastify";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    type: string;
    onConfirm: () => void;
    onCancel: () => void;
    setObjectToDelete: (object: any | null) => void;
    setIsConfirmationOpen: (isOpen: boolean) => void;
    objectToDelete: { id: number } | null;
    setObject?: (objects: any[]) => void; 
    objects?: any[];
    idKey: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    type,
    onConfirm,
    onCancel,
    setIsConfirmationOpen,
    setObjectToDelete,
    objectToDelete,
    objects,
    setObject,
    idKey
}) => {
    if (!isOpen) return null;

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setObjectToDelete(null);
    };
    

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-25 z-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-50">
                <h2 className="text-xl font-semibold mb-4 text-red-500 text-center">Confirmation de suppression</h2>
                <div className="mb-4">
                    <p>
                        Êtes-vous sûr de vouloir supprimer le {type} <strong className="text-amber-500">{title}</strong> ?
                    </p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer" onClick={onConfirm}>
                        Confirmer
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer" onClick={onCancel}>
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
