import React from "react";
import { MapPin, Info, X } from "lucide-react"; // Import des icônes
import { ILieu } from "../../../../interfaces";
import Map from "../../../../components/Map";

interface LieuModalProps {
    isOpen: boolean;
    lieu: ILieu | null;
    onClose: () => void;
}

const LieuModal: React.FC<LieuModalProps> = ({ isOpen, lieu, onClose }) => {
    if (!isOpen || !lieu) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600 flex items-center justify-center gap-2">
                    <MapPin size={24} className="text-purple-500" />
                    {lieu.nom}
                </h2>

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
                    <Map latitude={lieu.latitude} longitude={lieu.longitude} name={lieu.adresse}/>
                </div>
            </div>
        </div>
    );
};

export default LieuModal;
