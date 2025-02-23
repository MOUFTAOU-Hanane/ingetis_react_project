import React from "react";
import { X } from "lucide-react"; // Import de l'icône de fermeture

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    itemNom: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    itemNom,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                {/* Bouton de fermeture */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onCancel}
                >
                    <X size={20} />
                </button>

                {/* Titre */}
                <h2 className="text-xl font-semibold text-center mb-4 text-purple-600">{title}</h2>

                {/* Contenu */}
                <p className="text-gray-700 text-sm text-center mb-6">
                    Êtes-vous sûr de vouloir supprimer <strong>"{itemNom}"</strong> ? Cette action est irréversible.
                </p>

                {/* Boutons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
