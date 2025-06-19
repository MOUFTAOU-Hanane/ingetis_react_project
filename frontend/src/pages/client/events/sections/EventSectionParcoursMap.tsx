import React from 'react';
import 'leaflet/dist/leaflet.css';
import { IParcours } from '../../../../interfaces';
import ParcoursMapWithSelector from '../../../../components/parcours/ParcoursMapWithSelector';

interface EventSectionParcoursMapProps {
    parcours: { [key: string]: IParcours };
}

const EventSectionParcoursMap: React.FC<EventSectionParcoursMapProps> = ({ parcours }) => {
    return (
        <ParcoursMapWithSelector parcours={parcours} />
    );
};

export default EventSectionParcoursMap;