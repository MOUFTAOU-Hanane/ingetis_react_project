import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ICoordinate, IMarkerData } from '../../interfaces';
import { MapMarker } from './MapMarker';
import { MapRoute } from './MapRoute';
import { EmptyState } from '../ui/EmptyState';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
    coordinates: ICoordinate[];
    center: [number, number];
    zoom?: number;
    showRoute?: boolean;
    loading?: boolean;
    error?: string | null;
    className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
    coordinates,
    center,
    zoom = 13,
    showRoute = true,
    loading = false,
    error = null,
    className = "h-96 w-full"
}) => {
    if (loading) {
        return <span>Chargement de la carte...</span>;
    }

    if (error) {
        return <EmptyState message={error} className={className} />;
    }

    if (coordinates.length === 0) {
        return <EmptyState message="Aucune adresse trouvée pour ce parcours." className={className} />;
    }

    const markers: IMarkerData[] = coordinates.map((coord, index) => ({
        ...coord,
        index,
        isFirst: index === 0,
        isLast: index === coordinates.length - 1
    }));

    return (
        <div className={`${className} rounded-lg overflow-hidden shadow-lg`}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {showRoute && <MapRoute coordinates={coordinates} />}
                
                {markers.map((marker) => (
                    <MapMarker key={marker.index} marker={marker} />
                ))}
            </MapContainer>
        </div>
    );
};