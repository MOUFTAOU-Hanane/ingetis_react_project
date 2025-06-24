import React from "react";
import { X, Image, Tag } from "lucide-react"; // Import des icônes
import { IOeuvre } from "../../interfaces";

interface OeuvreModalProps {
    isOpen: boolean;
    oeuvre: IOeuvre | null;
    onClose: () => void;
}

const OeuvreModal: React.FC<OeuvreModalProps> = ({ isOpen, oeuvre, onClose }) => {
    if (!isOpen || !oeuvre) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                {/* Bouton de fermeture */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                {/* Image de l'œuvre */}
                <img src={`http://localhost:3005${oeuvre.image}`} alt={oeuvre.titre} className="w-full h-64 object-cover rounded-md" />

                {/* Titre de l'œuvre */}
                <h2 className="text-2xl font-bold mt-4 text-center text-yellow-600">{oeuvre.titre}</h2>

                {/* Informations de l'œuvre */}
                <div className="space-y-4 text-gray-700 mt-4">
                    <div className="flex items-center gap-3">
                        <Tag size={20} className="text-blue-500" />
                        <span>{oeuvre.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">Prix</span>
                        <span>{oeuvre.prix} €</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Image size={20} className="text-green-500 mt-1" />
                        <p className="text-sm text-gray-600">{oeuvre.description}</p>
                    </div>
                </div>

                {/* Bouton de fermeture */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OeuvreModal;
