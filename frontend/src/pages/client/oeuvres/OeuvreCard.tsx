import React from 'react';
import { IOeuvre } from '../../../interfaces';

interface OeuvreCardProps {
    oeuvre: IOeuvre;
    onClick: (oeuvre: IOeuvre) => void;
}

const OeuvreCard: React.FC<OeuvreCardProps> = ({ oeuvre, onClick }) => {
    return (
        <div
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/15 cursor-pointer"
            onClick={() => onClick(oeuvre)}
        >
            <div className="relative">
                <img
                    src={`${oeuvre.image}`}
                    alt={oeuvre.titre}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-b from-transparent to-black/60 text-white p-4 w-full h-full flex flex-col justify-between">
                    <h3 className="text-xl font-semibold">{oeuvre.titre}</h3>
                    <p className="mt-2">{oeuvre.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold">{oeuvre.prix}€</span>
                        <span className="bg-yellow-500 text-white py-1 px-3 rounded-full">{oeuvre.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OeuvreCard;