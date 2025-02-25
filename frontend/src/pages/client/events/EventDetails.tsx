import React from 'react';
import { Event } from '../../../interfaces';
import { Calendar, Image, BookOpen, MapPin, Info } from 'lucide-react';
import { formatDate } from './EventCard'; // Utilisez la fonction formatDate de EventCard

interface EventDetailsProps {
event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
    return (
        <div className="mt-6 space-y-6 border-t border-white/10 pt-6 animate-fadeIn">
            {/* Programs */}
            {event.programs.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                        <Calendar size={18} />
                        <span className="">Programme</span>
                    </h3>
                    <div className="space-y-3">
                        {event.programs.map((program) => (
                            <div key={program.id_program} className="bg-white/5 rounded-lg p-4">
                                <div className="flex justify-between">
                                <h4 className="font-medium text-white">{program.titre}</h4>
                                <span className="text-purple-300">{formatDate(program.date_heure)}</span>
                                </div>
                                <p className="text-white/80 mt-1">{program.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Media Gallery */}
            {event.medias.length > 1 && (
                <div>
                    <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                        <Image size={18} />
                        <span className="">Galerie</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {event.medias.map((media) => (
                            <img
                                key={media.id_media}
                                src={media.url_media}
                                alt="Média de l'événement"
                                className="rounded-lg h-24 w-full object-cover"
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {/* Catalogs */}
            {event.catalogs.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                        <BookOpen size={18} />
                        <span className="">Catalogues</span>
                    </h3>
                    <div className="space-y-3">
                        {event.catalogs.map((catalog) => (
                            <div key={catalog.id_catalog} className="bg-white/5 rounded-lg p-4">
                                <h4 className="font-medium text-white">{catalog.nom_catalogue}</h4>
                                <p className="text-white/80 mt-1">{catalog.description}</p>
                                <button className="mt-2 text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1">
                                <Info size={14} />
                                <span>Télécharger</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Location */}
            <div>
                <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                    <MapPin size={18} />
                    <span className="">Lieu</span>
                </h3>
                <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white">{event.lieu.nom}</h4>
                    <p className="text-white/80">{event.lieu.adresse}</p>
                    <p className="text-white/80 mt-2">{event.lieu.description}</p>
                    <div className="mt-3 h-48 rounded-lg overflow-hidden bg-gray-200">
                        <img 
                            src={`/api/placeholder/800/400`} 
                            alt="Plan du lieu" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
