import React from 'react';
import { NavLink } from 'react-router-dom';
import { IEvent } from '../../../interfaces';
import { formatDate, isUpcoming } from '../../../helpers/utils';

interface EventCardProps {
    event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex">
                {event.medias && event.medias[0] && (
                    <div className="w-24 h-24 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                        <img 
                            src={`${event.medias[0].url_media}`} 
                            alt={event.titre}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder.jpg';
                            }}
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-lg font-medium">{event.titre}</h3>
                    <p className="text-gray-600 mt-1">
                        {formatDate(event.date_debut)}
                        {event.date_debut !== event.date_fin && 
                        ` - ${formatDate(event.date_fin)}`}
                    </p>
                    <p className="text-gray-600 text-sm">{event.lieu.nom}</p>
                    <div className="flex justify-between mt-3">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {isUpcoming(event.date_debut) ? 'À venir' : 'Passé'}
                        </span>
                        <NavLink 
                            to={`/user/events/${event.id_event}`} 
                            className="text-yellow-600 hover:text-yellow-800"
                        >
                            Détails
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;