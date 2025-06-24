import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { IEvent } from '../../../interfaces';
import { formatDateLong } from '../../../helpers/utils';

interface UpcomingEventsSectionProps {
    events: IEvent[];
}

const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ events }) => {
    const upcomingEvents = events
        .filter(event => new Date(event.date_debut) > new Date())
        .sort((a, b) => 
            new Date(a.date_debut).getTime() - 
            new Date(b.date_debut).getTime()
        )
        .slice(0, 3);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
                <Calendar className="text-indigo-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">
                    Événements à venir
                </h2>
            </div>
            <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                    <div 
                        key={index} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <h3 className="font-semibold text-gray-800">
                            {event.titre}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDateLong(event.date_debut)}
                        </div>
                        {event.lieu && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.lieu.nom || 'Lieu à confirmer'}
                            </div>
                        )}
                    </div>
                ))}
                <div className="mt-2 text-right">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        Voir tous les événements →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventsSection;