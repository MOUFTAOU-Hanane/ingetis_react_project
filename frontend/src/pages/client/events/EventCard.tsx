// components/EventCard/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IEvent } from '../../../interfaces';
import { useAuth } from '../../../context/AuthContext';
import ConfirmationModal from './ConfirmationModal';
import { useParticipants } from '../../../hooks/useParticipants';
import { eventService } from '../../../services/eventService';
import EventSectionImage from './sections/EventSectionImage';
import EventMetadata from './sections/EventMetadata';
import EventActions from './sections/EventActions';
import ConfirmationModalUnRegister from './ConfirmationModalUnregister';

interface EventCardProps {
    event: IEvent;
    toggleEventExpansion: (id: number) => void;
    expandedEvents: Set<number>;
}

const EventCard: React.FC<EventCardProps> = ({ event, toggleEventExpansion, expandedEvents }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUnregisterModalOpen, setIsUnregisterModalOpen] = useState(false);

    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const { user } = useAuth();
    const { isRegisteredForEvent, getParticipantId } = useParticipants();

    const handleOpenModal = (eventId: number) => {
        setSelectedEventId(eventId);
        setIsModalOpen(true);
    };
    
    const handleOpenModalUnRegister = (eventId: number) => {
        setIsUnregisterModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEventId(null);
    };

    const handleRegister = async (eventId: number) => {
        if (!user?.id_user) {
            toast.error("Vous devez être connecté pour vous inscrire");
            return;
        }
        
        try {
            await eventService.registerForEvent({eventId, participantId: user.id_user});
            toast.success("Demande d'inscription réussie !");
            handleCloseModal();
        } catch (error) {
            toast.error("Erreur lors de l'inscription");
        }
    };

    const onUnregister = async (eventId: number) => {
        const participantId = getParticipantId(eventId);

        if (!user?.id_user) {
            toast.error("Vous devez être connecté pour vous désinscrire");
            return;
        }
        try {
            await eventService.unregisterFromEvent(participantId);
            toast.success("Désinscription réussie !");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error("Erreur lors de la désinscription");
        }
    }

    const handleViewDetails = (eventId: number) => {
        navigate(`/user/events/${eventId}`);
    };

    const isRegistered = isRegisteredForEvent(event.id_event);
    const imageUrl = event.medias[0]?.url_media 
        ? `${event.medias[0].url_media}` 
        : "/api/placeholder/400/600";

    return (
        <div key={event.id_event} className="">
            <div className="grid grid-cols-1">
                {/* Event Image */}
                <EventSectionImage imageUrl={imageUrl} title={event.titre} />

                {/* Event Details */}
                <div className="md:col-span-2 p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white">{event.titre}</h2>
                
                <EventMetadata 
                    startDate={new Date(event.date_debut)} 
                    endDate={new Date(event.date_fin)} 
                    location={event.lieu.nom} 
                />
                
                <p className="text-white/90">{event.description}</p>
                
                <EventActions 
                    eventId={event.id_event}
                    onUnregister={handleOpenModalUnRegister}
                    onViewDetails={handleViewDetails}
                    onToggleComments={() => toggleEventExpansion(event.id_event)}
                    onRegister={handleOpenModal}
                    isRegistered={isRegistered}
                    
                />
                </div>
            </div>

            {/* Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                eventId={event?.id_event}
                onClose={handleCloseModal}
                onConfirm={handleRegister}
                eventName={event?.titre || ''}
                participantId={user?.id_user || 0}
                participantName={user?.nom || ''}
                participantEmail={user?.email || ''}
            />

            {/* Unregister Modal */}
            <ConfirmationModalUnRegister
                isOpen={isUnregisterModalOpen}
                eventId={event?.id_event}
                onClose={() => setIsUnregisterModalOpen(false)}
                onConfirm={onUnregister}
                eventName={event?.titre || ''}
                participantId={getParticipantId(event?.id_event) || 0}
                participantName={user?.nom || ''}
                participantEmail={user?.email || ''}
            />
        </div>
    );
};

export default EventCard;