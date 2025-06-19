import React from 'react';
import { IParcours } from '../../interfaces';
import { useGeocoding } from '../../hooks/useGeocoding';
import { InteractiveMap } from '../map/InteractiveMap';

interface ParcoursMapProps {
    parcours: IParcours;
    className?: string;
}

export const ParcoursMap: React.FC<ParcoursMapProps> = ({ parcours, className }) => {
    const { coordinates, loading, error, mapCenter } = useGeocoding(parcours.lieux);

    return (
        <InteractiveMap
            coordinates={coordinates}
            center={mapCenter}
            loading={loading}
            error={error}
            className={className}
        />
    );
};