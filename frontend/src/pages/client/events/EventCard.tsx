import React, { useState } from 'react';
import { Event } from '../../../interfaces';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify'; // Assure-toi d'avoir installé react-toastify
import ConfirmationModal from './ConfirmationModal'; // Assure-toi de bien importer le modal

interface EventCardProps {
    event: Event;
    toggleEventExpansion: (id: number) => void;
    expandedEvents: Set<number>;
}

const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
};

const EventCard: React.FC<EventCardProps> = ({ event, toggleEventExpansion, expandedEvents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const handleOpenModal = (eventId: number) => {
        setSelectedEventId(eventId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEventId(null);
    };

    const handleRegister = async (eventId: number) => {
        try {
            // Logique pour l'inscription (ici c'est simulé par un timeout)
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // On simule une inscription réussie ou échouée
                    const success = Math.random() > 0.5; // Simule aléatoirement une réussite ou échec
                    success ? resolve('Inscription réussie !') : reject('Erreur lors de l\'inscription');
                }, 1000);
            });

            // Si l'inscription est réussie
            toast.success(response as string);
        } catch (error) {
            // Si une erreur survient
            toast.error(error as string);
        }
    };

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
                        
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 transition-colors font-medium"
                            onClick={() => handleOpenModal(event.id_event)}
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                eventId={selectedEventId}
                onClose={handleCloseModal}
                onConfirm={handleRegister}
            />
        </div>
    );
};

export { EventCard, formatDate };
