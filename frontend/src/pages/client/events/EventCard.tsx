import React, { useEffect, useMemo, useState } from 'react';
import { IEvent, IParticipant } from '../../../interfaces';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify'; // Assure-toi d'avoir installé react-toastify
import ConfirmationModal from './ConfirmationModal'; // Assure-toi de bien importer le modal
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import apiClient from '../../../apiClient';

interface EventCardProps {
    event: IEvent;
    toggleEventExpansion: (id: number) => void;
    expandedEvents: Set<number>;
}

const formatDate = (dateString: Date) => {
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
};

const EventCard: React.FC<EventCardProps> = ({ event, toggleEventExpansion, expandedEvents }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [participants, setParticipants] = useState<IParticipant | []>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await apiClient.get('/participants');
                console.log('RESPONSE', response.data);

                // Filtrer pour l'user connecté
                const filtered = response.data.filter(
                    (participant: IParticipant) => participant.user.id_user == user?.id_user
                );
                setParticipants(filtered); 
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };
    
        fetchParticipants(); // Appel de la fonction quand le composant se monte
    }, []);

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
            await apiClient.post('/participants', {id_event: eventId, id_user: user?.id_user, statut: 'demande' })
            // Si l'inscription est réussie
            toast.success("Demande d'inscription réussie !");
            setIsModalOpen(false);
            setSelectedEventId(null);
        } catch (error) {
            // Si une erreur survient
            toast.error(error as string);
        }
    };

    const isAlreadyRegistered = useMemo(() => {
        return Object.values(participants).some((participant: IParticipant) => participant.event.id_event === event.id_event);
    }, [participants, event.id_event]);

    return (
        <div key={event.id_event} className="!h-[280px]">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Event Image */}
                <div className="md:col-span-1 h-64 md:h-full relative">
                        <img
                            src={`http://localhost:3005${event.medias[0]?.url_media}` || "/api/placeholder/400/600"}
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
                            onClick={() => navigate(`/user/events/${event.id_event}`)}
                        >
                            <span>Détails</span>
                        </button>
                        <button 
                            className="text-yellow-300 hover:text-purple-100 transition-colors flex items-center gap-1"
                            
                            onClick={() => toggleEventExpansion(event.id_event)}
                        >
                            <span>Commenter</span>
                        </button>
                        
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 transition-colors font-medium"
                            onClick={() => isAlreadyRegistered ? undefined : handleOpenModal(event.id_event)}
                        >
                            {isAlreadyRegistered ? 'Déjà inscrit' : 'S\'inscrire'}
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
