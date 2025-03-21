import React from "react";
import { MapPin, Info, X, ExternalLink } from "lucide-react"; // Import des icônes
import { Lieu } from "./LieuxList"; // Assurez-vous que le type Lieu est bien exporté

interface LieuModalProps {
    isOpen: boolean;
    lieu: Lieu | null;
    onClose: () => void;
}

const LieuModal: React.FC<LieuModalProps> = ({ isOpen, lieu, onClose }) => {
    if (!isOpen || !lieu) return null;

    // URL Google Maps avec latitude et longitude
    const mapUrl = `https://www.google.com/maps?q=${lieu.latitude},${lieu.longitude}`;

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

                {/* Titre */}
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600 flex items-center justify-center gap-2">
                    <MapPin size={24} className="text-purple-500" />
                    {lieu.nom}
                </h2>

                {/* Contenu principal */}
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-blue-500" />
                        <span>{lieu.adresse}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">LAT</span>
                        <span>{lieu.latitude}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">LON</span>
                        <span>{lieu.longitude}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Info size={20} className="text-yellow-500 mt-1" />
                        <p className="text-sm text-gray-600">{lieu.description}</p>
                    </div>
                </div>

                {/* Bouton "Voir dans le map" */}
                <div className="mt-6 flex justify-center">
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                        <ExternalLink size={16} />
                        Voir dans le map
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LieuModal;
