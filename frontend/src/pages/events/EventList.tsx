import React, { useEffect, useMemo, useState } from "react";
import { Edit, Trash, Eye, Plus, List, AlertTriangle } from "lucide-react"; // Ajoutez AlertTriangle
import apiClient from "../../apiClient";
import Layout from "../../components/Layout";
import EventModal from "./EventModal"; 
import ConfirmationModal from "./ConfirmationModal"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Event } from "../../interfaces";

// Données fictives pour les tests
const sampleEvents: Event[] = [
    // Événements fictifs
    {
        id_event: 1,
        titre: "Conférence React",
        description: "Découvrez les nouveautés de React.",
        date_debut: "2025-02-22",
        date_fin: "2025-02-22",
        lieu: { id_lieu: 11, nom: "Palais des Congrès", adresse: "123 Avenue des Technologies" },
        programs: [],
        catalogs: [],
        medias: [] // Si ces tableaux sont vides, l'icône s'affichera
    },
    // Autres événements ici...
];

const EventsList: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); 
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null); 
    const [filterUpcoming, setFilterUpcoming] = useState<boolean>(true); 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setEvents(sampleEvents); // A modifier en API
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleOpenModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleEdit = (event: Event) => {
        navigate(`/events/update/${event.id_event}`);
    };

    const handleAddEvent = () => {
        navigate("/events/create"); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleOpenConfirmation = (event: Event) => {
        setEventToDelete(event);
        setIsConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setEventToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            setEvents(events.filter((event) => event.id_event !== eventToDelete.id_event));
            toast.success("Événement supprimé avec succès !");
            handleCloseConfirmation();
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast.error("Erreur lors de la suppression de l'événement !");
        }
    };

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const currentDate = new Date();
            const eventDate = new Date(event.date_debut);
            
            return filterUpcoming ? eventDate >= currentDate : eventDate < currentDate;
        });
    }, [events, filterUpcoming]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <Layout title="Liste des événements">
            <div className="p-6">
                <button
                    onClick={handleAddEvent}
                    className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={16} /> Ajouter un nouvel événement
                </button>

                <div className="flex justify-end mb-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${filterUpcoming ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => setFilterUpcoming(true)}
                    >
                        À venir
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 rounded-lg ${!filterUpcoming ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => setFilterUpcoming(false)}
                    >
                        Passés
                    </button>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-white">
                            <thead className="text-purple-500 bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Titre</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-left">Date début</th>
                                    <th className="px-6 py-3 text-left">Date fin</th>
                                    <th className="px-6 py-3 text-left">Lieu</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event.id_event} className="border-b hover:bg-gray-100 hover:text-gray-800">
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {(event.programs.length === 0 || event.medias.length === 0) && (
                                                <AlertTriangle size={16} className="text-red-500" />
                                            )}
                                            {event.titre}
                                        </td>
                                        <td className="px-6 py-4">{event.description}</td>
                                        <td className="px-6 py-4">{dayjs(event.date_debut).format('DD/MM/YYYY')}</td>
                                        <td className="px-6 py-4">{dayjs(event.date_fin).format('DD/MM/YYYY')}</td>
                                        <td className="px-6 py-4">{event.lieu.adresse}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Eye
                                                    size={16}
                                                    className="cursor-pointer text-green-600"
                                                    onClick={() => handleOpenModal(event)}
                                                />
                                                <Edit
                                                    size={16}
                                                    className="cursor-pointer text-amber-500"
                                                    onClick={() => handleEdit(event)}
                                                />
                                                <Trash
                                                    size={16}
                                                    className="cursor-pointer text-red-600"
                                                    onClick={() => handleOpenConfirmation(event)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-8">
                        <h3 className="text-lg text-gray-600">Aucun événement à afficher.</h3>
                    </div>
                )}
            </div>

            <EventModal isOpen={isModalOpen} event={selectedEvent} onClose={handleCloseModal} />
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title="Confirmation de suppression"
                eventTitre={eventToDelete?.titre ?? "Anonyme"}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
            />
        </Layout>
    );
};

export default EventsList;
