import React, { useEffect, useMemo, useState } from "react";
import { Edit, Trash, Eye, Plus, List } from "lucide-react";
import apiClient from "../../apiClient";
import Layout from "../../components/Layout";
import EventModal from "./EventModal"; // Import du modal pour afficher les détails
import ConfirmationModal from "./ConfirmationModal"; // Import du modal de confirmation pour la suppression
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Event } from "../../interfaces";

// Données fictives pour les tests
const sampleEvents: Event[] = [
    {
        id_event: 1,
        titre: "Conférence React",
        description: "Découvrez les nouveautés de React.",
        date_debut: "2025-02-22",
        date_fin: "2025-02-22",
        lieu: { id_lieu: 11, nom: "Palais des Congrès", adresse: "123 Avenue des Technologies" }
    },
    {
        id_event: 2,
        titre: "Atelier TypeScript",
        description: "Un atelier pratique pour apprendre TypeScript.",
        date_debut: "2025-02-25",
        date_fin: "2025-02-25",
        lieu: { id_lieu: 18, nom: "Campus Tech", adresse: "456 Rue du Code" }
    },
    {
        id_event: 3,
        titre: "Hackathon",
        description: "Un marathon de programmation.",
        date_debut: "2025-03-01",
        date_fin: "2025-03-02",
        lieu: { id_lieu: 17, nom: "Espace Innovation", adresse: "789 Boulevard des Startups" }
    },
    {
        id_event: 4,
        titre: "Séminaire DevOps",
        description: "Explorez les pratiques DevOps.",
        date_debut: "2025-03-05",
        date_fin: "2025-03-06",
        lieu: { id_lieu: 104, nom: "Tech Hub", adresse: "1010 Route du Cloud" }
    },
    {
        id_event: 5,
        titre: "Formation Docker",
        description: "Apprenez les bases de Docker.",
        date_debut: "2025-01-05",
        date_fin: "2025-01-05",
        lieu: { id_lieu: 105, nom: "Centre DevOps", adresse: "111 Rue des Conteneurs" }
    },
    {
        id_event: 6,
        titre: "Conférence IA",
        description: "L'intelligence artificielle expliquée.",
        date_debut: "2025-03-15",
        date_fin: "2025-03-15",
        lieu: { id_lieu: 106, nom: "Institut AI", adresse: "222 Chemin des Algorithmes" }
    },
    {
        id_event: 7,
        titre: "Meetup Cloud Computing",
        description: "Rencontrez les experts du cloud.",
        date_debut: "2025-03-20",
        date_fin: "2025-03-20",
        lieu: { id_lieu: 107, nom: "Cloud Center", adresse: "333 Avenue des Données" }
    },
    {
        id_event: 8,
        titre: "Conférence Sécurité",
        description: "Les enjeux de la cybersécurité.",
        date_debut: "2025-03-25",
        date_fin: "2025-03-25",
        lieu: { id_lieu: 108, nom: "Cyber Arena", adresse: "444 Rue du Firewall" }
    },
    {
        id_event: 9,
        titre: "Formation Laravel",
        description: "Maîtrisez le framework Laravel.",
        date_debut: "2025-03-30",
        date_fin: "2025-03-30",
        lieu: { id_lieu: 109, nom: "Académie Web", adresse: "555 Boulevard du Framework" }
    },
    {
        id_event: 10,
        titre: "Webinar GraphQL",
        description: "Introduction à GraphQL.",
        date_debut: "2025-04-05",
        date_fin: "2025-04-05",
        lieu: { id_lieu: 110, nom: "Online Event", adresse: "Lien en ligne" }
    }
];


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
                // Commenter l'appel à l'API pour tester les données fictives
                // const response = await apiClient.get("/admin/events");
                // setEvents(response.data);
                setEvents(sampleEvents); // Utilisation des données fictives
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
        navigate("/events/create"); // Naviguer vers la page de création d'un nouvel événement
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
            // Suppression fictive
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
                {/* Bouton pour ajouter un nouvel événement */}
                <button
                    onClick={handleAddEvent}
                    className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={16} /> Ajouter un nouvel événement
                </button>

                {/* Filtrage des événements */}
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
                                        <td className="px-6 py-4">{event.titre}</td>
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
                                                <List
                                                    size={16}
                                                    className="cursor-pointer text-purple-400"
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
