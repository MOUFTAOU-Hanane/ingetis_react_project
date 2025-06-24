import React from 'react';
import { IParcours } from '../../interfaces';
import { ParcoursCard } from './ParcoursCard';

interface ParcoursSelectorProps {
    parcours: { [key: string]: IParcours };
    selectedParcours: IParcours | null;
    onSelectParcours: (parcours: IParcours) => void;
}

export const ParcoursSelector: React.FC<ParcoursSelectorProps> = ({
    parcours,
    selectedParcours,
    onSelectParcours
}) => {
    const parcoursEntries = Object.entries(parcours);
    
    if (parcoursEntries.length <= 1) return null;

    return (
        <div className="bg-white/2 rounded-lg shadow-sm border border-gray-200/2 p-4">
            <h3 className="font-semibold text-orange-900 mb-3">Choisir un parcours :</h3>
            <div className="flex flex-wrap gap-4">
                {parcoursEntries.map(([index, p]) => (
                    <ParcoursCard
                        key={index}
                        parcours={p}
                        isSelected={selectedParcours === p}
                        onClick={() => onSelectParcours(p)}
                    />
                ))}
            </div>
        </div>
    );
};