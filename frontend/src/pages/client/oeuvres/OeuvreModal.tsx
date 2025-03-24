import React from 'react';
import { IOeuvre } from '../../../interfaces';

interface OeuvreModalProps {
    oeuvre: IOeuvre;
    onClose: () => void;
}

const OeuvreModal: React.FC<OeuvreModalProps> = ({ oeuvre, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={onClose}>
            <div
                className="bg-white p-8 rounded-xl max-w-3xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-800 p-2 transition-all cursor-pointer"
                >
                    ✕
                </button>

                <div className="relative">
                    {oeuvre.type === 'vidéo' ? (
                        <video controls autoPlay className="w-full rounded-xl">
                            <source src={`http://localhost:3005${oeuvre.image}`} type="video/mp4" />
                            Votre navigateur ne supporte pas les vidéos.
                        </video>
                    ) : (
                        <img
                            src={`http://localhost:3005${oeuvre.image}`}
                            alt={oeuvre.titre}
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">{oeuvre.titre}</h3>
                    <p className="mt-2">{oeuvre.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold">{oeuvre.prix}€</span>
                        <span className="bg-purple-500 text-white py-1 px-3 rounded-full">{oeuvre.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OeuvreModal;