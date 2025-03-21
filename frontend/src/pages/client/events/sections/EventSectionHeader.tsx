import React from 'react'
import { IEvent } from '../../../../interfaces'
import { formatDateRange } from '../../../../helpers/utils'
import { Clock, MapPin } from 'lucide-react'

const EventSectionHeader: React.FC<{ event: IEvent }> = ({ event }) => {
    return (
        <div className="mb-8">
            {event.medias && event.medias.length > 0 && (
                <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                    <img
                        src={`http://localhost:3005${event.medias[0].url_media}`}
                        alt={event.titre}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Event Title and Dates */}
            <h1 className="text-3xl font-bold text-white mb-2">
                {event.titre}
            </h1>
            <div className="flex items-center text-purple-300 mb-4">
                <Clock size={16} className="mr-1" />
                <span>{formatDateRange(event.date_debut, event.date_fin)}</span>
                {event.lieu && (
                    <>
                        <span className="mx-2">•</span>
                        <MapPin size={16} className="mr-1" />
                        <span>{event.lieu.nom}</span>
                    </>
                )}
            </div>

            {/* Event Description */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-white/90 leading-relaxed">
                    {event.description}
                </p>
            </div>
        </div>
    )
}

export default EventSectionHeader