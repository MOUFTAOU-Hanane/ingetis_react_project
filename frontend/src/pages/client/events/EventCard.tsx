import React from 'react';
import { Event } from '../../../interfaces';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventCardProps {
event: Event;
toggleEventExpansion: (id: number) => void;
expandedEvents: Set<number>;
}

const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
};

const EventCard: React.FC<EventCardProps> = ({ event, toggleEventExpansion, expandedEvents }) => {

    return (
        <div key={event.id_event} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/15">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Event Image */}
                <div className="md:col-span-1 h-64 md:h-full relative">
                    <img
                        src={event.medias[0]?.url_media || "/api/placeholder/400/600"}
                        alt={event.titre}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Événement
                    </div>
                </div>

                {/* Event Details */}
                <div className="md:col-span-2 p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-white">{event.titre}</h2>
                    
                    <div className="flex flex-wrap gap-4 text-white/80">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{format(new Date(event.date_debut), 'dd MMM', { locale: fr })} - {format(new Date(event.date_fin), 'dd MMM yyyy', { locale: fr })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{event.lieu.nom}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{format(new Date(event.date_debut), 'HH:mm', { locale: fr })} - {format(new Date(event.date_fin), 'HH:mm', { locale: fr })}</span>
                        </div>
                    </div>
                    
                    <p className="text-white/90">{event.description}</p>
                    
                    <div className="pt-2 flex justify-between items-center">
                        <button 
                            className="text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1"
                            onClick={() => toggleEventExpansion(event.id_event)}
                        >
                        <span>Détails</span>
                            {expandedEvents.has(event.id_event) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { EventCard, formatDate };
