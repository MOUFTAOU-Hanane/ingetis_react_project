import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventMetadataProps {
    startDate: Date;
    endDate: Date;
    location: string;
}

const EventMetadata: React.FC<EventMetadataProps> = ({ startDate, endDate, location }) => {
    return (
        <div className="flex flex-wrap gap-4 text-white/80">
            <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>
                    {format(new Date(startDate), 'dd MMM', { locale: fr })} - {format(new Date(endDate), 'dd MMM yyyy', { locale: fr })}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>
                    {format(new Date(startDate), 'HH:mm', { locale: fr })} - {format(new Date(endDate), 'HH:mm', { locale: fr })}
                </span>
            </div>
        </div>
    );
};

export default EventMetadata;