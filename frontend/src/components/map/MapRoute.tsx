import React from 'react';
import { Polyline } from 'react-leaflet';
import { ICoordinate } from '../../interfaces';

interface MapRouteProps {
    coordinates: ICoordinate[];
    color?: string;
    weight?: number;
    opacity?: number;
    dashArray?: string;
}

export const MapRoute: React.FC<MapRouteProps> = ({ 
    coordinates,
    color = "#3B82F6",
    weight = 3,
    opacity = 0.7,
    dashArray = "5, 10"
}) => {
    if (coordinates.length <= 1) return null;

    const polylinePositions: [number, number][] = coordinates.map(coord => [coord.lat, coord.lng]);

    return (
        <Polyline
            positions={polylinePositions}
            color={color}
            weight={weight}
            opacity={opacity}
            dashArray={dashArray}
        />
    );
};