import React, { useEffect, useMemo, useState } from "react";
import { IEvent, IParticipant } from "../../../interfaces";
import { Calendar, Image, BookOpen, MapPin, Clock } from "lucide-react";
import { formatDate } from "./EventCard"; // Utilisez la fonction formatDate de EventCard
import apiClient from "../../../apiClient";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { toast } from "react-toastify";
import Map from "../../../components/Map";
import { useAuth } from "../../../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

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
                console.log('RESPONSE', response.data);

                // Filtrer pour l'user connecté
                if(id) {
                    const filtered = response.data.filter(
                        (participant: IParticipant) => participant.user.id_user == user?.id_user && participant?.event?.id_event == parseInt(id)
                    );
                    setParticipants(filtered); 
                }
            } catch (error) {
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

    // Format date range for display
    const formatDateRange = (dateDebut: string, dateFin: string) => {
        const debut = new Date(dateDebut);
        const fin = new Date(dateFin);

        // Same day event
        if (dateDebut === dateFin) {
            return formatDate(new Date(dateDebut));
        }

        // Multi-day event
        const debutFormatted = debut.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const finFormatted = fin.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return `${debutFormatted} - ${finFormatted}`;
    };

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
                    {/* Event Header Section - Newly Added */}
                    <div className="mb-8">
                        {/* Main image if available */}
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

                    {/* Programs */}
                    {event.programs.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Programme</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {event.programs.map((program) => (
                                    <div
                                        key={program.id_program}
                                        className="bg-white/5 rounded-lg p-4"
                                    >
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-white">{program.titre}</h4>
                                        <span className="text-purple-300">
                                            {formatDate(program.date_heure)}
                                        </span>
                                    </div>
                                    <p className="text-white/80 mt-1">{program.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Media Gallery */}
                    {event.medias.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                                <Image size={18} />
                                <span>Galerie</span>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {event.medias.map((media) => (
                                    <img
                                        key={media.id_media}
                                        src={`http://localhost:3005${media.url_media}`}
                                        alt="Média de l'événement"
                                        className="rounded-lg h-24 w-full object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Catalogs */}
                    {event.catalogs.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                                <BookOpen size={18} />
                                <span>Catalogues</span>
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {event.catalogs.map((catalog) => (
                                    <div
                                        key={catalog.id_catalog}
                                        className="bg-white/5 rounded-lg p-4"
                                    >
                                    <h4 className="font-medium text-white">
                                        {catalog.nom_catalogue}
                                    </h4>
                                    <p className="text-white/80 mt-1">{catalog.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Location */}
                    <div>
                        <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                            <MapPin size={18} />
                            <span>Lieu</span>
                        </h3>
                        <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="font-medium text-white">{event.lieu.nom}</h4>
                            <p className="text-white/80">{event.lieu.adresse}</p>
                            <p className="text-white/80 mt-2">{event.lieu.description}</p>
                            <div className="mt-3 h-48 rounded-lg overflow-hidden bg-gray-200">
                                <Map latitude={event.lieu.latitude} longitude={event.lieu.longitude} name={event.lieu.nom} />
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        eventId={event?.id_event}
                        onClose={handleModal}
                        onConfirm={handleRegister}
                    />
                </>
            )}
        </Layout>
    );
};

export default EventDetails;