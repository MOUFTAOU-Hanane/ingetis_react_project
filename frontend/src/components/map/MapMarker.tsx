import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { IMarkerData } from '../../interfaces';
import { createNumberedIcon } from '../../utils/mapIcons';

interface MapMarkerProps {
    marker: IMarkerData;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ marker }) => {
    const getStepLabel = (marker: IMarkerData): string => {
        if (marker.isFirst) return "🚩 Départ";
        if (marker.isLast && !marker.isFirst) return "🏁 Arrivée";
        return `Étape ${marker.index + 1}`;
    };

    return (
        <Marker
            position={[marker.lat, marker.lng]}
            icon={createNumberedIcon(marker.index + 1, marker.isFirst, marker.isLast)}
        >
            <Popup>
                <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-1">{marker.nom}</h3>
                    <p className="text-sm text-gray-600">{marker.adresse}</p>
                    <div className="mt-2 text-xs text-blue-600">
                        {getStepLabel(marker)}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};