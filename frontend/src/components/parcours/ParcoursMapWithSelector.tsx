import React, { useState, useEffect, useRef } from 'react';
import { IParcours } from '../../interfaces';
import { ParcoursSelector } from './ParcoursSelector';
import { ParcoursMap } from './ParcoursMap';

interface ParcoursMapWithSelectorProps {
    parcours: { [key: string]: IParcours };
}

export const ParcoursMapWithSelector: React.FC<ParcoursMapWithSelectorProps> = ({ parcours }) => {
    const [selectedParcours, setSelectedParcours] = useState<IParcours | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (parcours && Object.keys(parcours).length > 0) {
            const firstKey = Object.keys(parcours)[0];
            setSelectedParcours(parcours[firstKey]);
        }
    }, [parcours]);

    // Effet pour le défilement automatique lors de la sélection d'un parcours
    useEffect(() => {
        if (selectedParcours && mapRef.current) {
            // Petit délai pour s'assurer que le DOM est mis à jour
            setTimeout(() => {
                mapRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100);
        }
    }, [selectedParcours]);

    const handleSelectParcours = (parcours: IParcours) => {
        setSelectedParcours(parcours);
    };

    return (
        <div className="space-y-6">
            <ParcoursSelector
                parcours={parcours}
                selectedParcours={selectedParcours}
                onSelectParcours={handleSelectParcours}
            />

            {selectedParcours && (
                <div 
                    ref={mapRef}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {selectedParcours.nom}
                    </h3>
                    <ParcoursMap parcours={selectedParcours} />
                </div>
            )}
        </div>
    );
};

export default ParcoursMapWithSelector;