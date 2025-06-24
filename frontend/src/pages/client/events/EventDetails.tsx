import React, { useEffect, useMemo, useState } from "react";
import { IEvent, IMedia, IParticipant } from "../../../interfaces";
import apiClient from "../../../apiClient";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";
import EventSectionHeader from "./sections/EventSectionHeader";
import EventSectionPrograms from "./sections/EventSectionPrograms";
import EventSectionMedias from "./sections/EventSectionMedias";
import EventSectionCatalogs from "./sections/EventSectionCatalogs";
import EventSectionLieu from "./sections/EventSectionLieu";
import EventSectionParcours from "./sections/EventSectionParcours";

const EventDetails: React.FC = () => {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { id } = useParams();
    const [participants, setParticipants] = useState<IParticipant | []>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await apiClient.get('/participants');

                // Filtrer pour l'user connecté
                if(id) {
                    const filtered = response.data.filter(
                        (participant: IParticipant) => participant.participants.id_user == user?.id_user && participant?.event?.id_event == parseInt(id)
                    );
                    setParticipants(filtered); 
                }
            } catch (error) {
                toast.error("Une erreur s'est produite !");
                console.error('Error fetching participants:', error);
            }
        };
    
        fetchParticipants(); 
    }, [id]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get(`/events/${id}`);
                setEvent(response.data.event);
            } catch (error) {
                toast.error("Erreur lors de la récupération des évènements !");
                console.log(error);
            }
        };

        fetchEvents();
    }, [id]);

    const isAlreadyRegistered = useMemo(() => {
        return Object.values(participants).some((participant: IParticipant) => participant.event.id_event === event?.id_event);
    }, [participants, event?.id_event]);

    const handleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleRegister = async () => {
        try {
            await apiClient.post('/participants', {id_event: event?.id_event, id_user: user?.id_user, statut: 'demande' })
            // Si l'inscription est réussie
            toast.success("Demande d'inscription réussie !");
            setIsModalOpen(false);
        } catch (error) {
            // Si une erreur survient
            toast.error(error as string);
        }
    };

    return (
        <Layout title={event?.titre || "Détails de l'événement"}>
            {event && (
                <>
                    <div className="p-4 text-end">
                        <button
                            className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-6 py-2 transition-colors font-medium"
                            onClick={() => isAlreadyRegistered ? undefined : handleModal()}
                        >
                            {isAlreadyRegistered ? 'Déjà inscrit' : 'S\'inscrire'}
                        </button>
                    </div>

                    <EventSectionHeader
                        event={event}
                    />

                    {/* Programs */}
                    {event.programs.length > 0 && (
                        <EventSectionPrograms 
                            programs={event?.programs}
                        />
                    )}


                    {/* Media Gallery */}
                    {event.medias.length > 0 && (
                        <EventSectionMedias 
                            medias={event.medias}
                        />
                    )}

                    {/* Catalogs */}
                    {event.catalogs.length > 0 && (
                        <EventSectionCatalogs 
                            catalogs={event.catalogs}
                        />
                    )}


                    {/* Location */}
                    {event.lieu && (
                        <>
                            <EventSectionLieu
                                lieu={event.lieu}
                            />
                            <EventSectionParcours 
                                lieu={event.lieu}
                            />
                        </>
                    )}


                    {/* Modal */}
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        eventId={event?.id_event}
                        onClose={handleModal}
                        onConfirm={handleRegister}
                        eventName={event?.titre || ''}
                        participantId={user?.id_user || 0}
                        participantName={user?.nom || ''}
                        participantEmail={user?.email || ''}
                    />
                </>
            )}
        </Layout>
    );
};

export default EventDetails;