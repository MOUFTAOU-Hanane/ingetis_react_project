import React, { useEffect, useState } from "react";
import { Edit, Trash, Eye, Plus, List } from "lucide-react";
import apiClient from "../../apiClient";
import Layout from "../../components/Layout";
import EventModal from "./EventModal"; // Import du modal pour afficher les détails
import ConfirmationModal from "./ConfirmationModal"; // Import du modal de confirmation pour la suppression
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface Event {
    id_event: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    id_lieu: number;
}

const EventsList: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Pour stocker l'événement sélectionné
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Pour contrôler l'ouverture du modal
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); // Modal de confirmation
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null); // Pour stocker l'événement à supprimer
    const [filterUpcoming, setFilterUpcoming] = useState<boolean>(true); // Pour filtrer les événements à venir

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get("/admin/events");
                setEvents(response.data);
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
        navigate(`/admin/events/update/${event.id_event}`);
    };

    const handleAddEvent = () => {
        navigate("/admin/events/create"); // Naviguer vers la page de création d'un nouvel événement
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
            await apiClient.delete(`/admin/events/${eventToDelete.id_event}`);
            setEvents(events.filter((event) => event.id_event !== eventToDelete.id_event));
            toast.success("Événement supprimé avec succès !");
            handleCloseConfirmation();
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast.error("Erreur lors de la suppression de l'événement !");
        }
    };

    const filteredEvents = events.filter((event) => {
        const currentDate = new Date();
        const eventDate = new Date(event.date_debut);
        return filterUpcoming ? eventDate >= currentDate : eventDate < currentDate;
    });

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
                {/* Bouton pour ajouter un nouvel événement */}
                <button
                    onClick={handleAddEvent}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                >
                    <Plus size={16} /> Ajouter un nouvel événement
                </button>

                {/* Filtrage des événements */}
                <div className="flex justify-end mb-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${filterUpcoming ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => setFilterUpcoming(true)}
                    >
                        À venir
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 rounded-lg ${!filterUpcoming ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => setFilterUpcoming(false)}
                    >
                        Passés
                    </button>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-500">
                            <thead className="bg-purple-500 text-white">
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
                                    <tr key={event.id_event} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-4">{event.titre}</td>
                                        <td className="px-6 py-4">{event.description}</td>
                                        <td className="px-6 py-4">{event.date_debut}</td>
                                        <td className="px-6 py-4">{event.date_fin}</td>
                                        <td className="px-6 py-4">{event.id_lieu}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Eye
                                                    size={16}
                                                    className="cursor-pointer text-green-600"
                                                    onClick={() => handleOpenModal(event)}
                                                />
                                                <Edit
                                                    size={16}
                                                    className="cursor-pointer text-blue-600"
                                                    onClick={() => handleEdit(event)}
                                                />
                                                <Trash
                                                    size={16}
                                                    className="cursor-pointer text-red-600"
                                                    onClick={() => handleOpenConfirmation(event)}
                                                />
                                                <List
                                                    size={16}
                                                    className="cursor-pointer text-purple-600"
                                                    onClick={() => {}}
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

            {/* Modal pour afficher les détails de l'événement */}
            <EventModal isOpen={isModalOpen} event={selectedEvent} onClose={handleCloseModal} />

            {/* Modal de confirmation de suppression */}
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
