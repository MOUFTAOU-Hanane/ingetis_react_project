import React, { useEffect, useMemo, useState } from "react";
import { Edit, Trash, Eye, Plus, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import apiClient from "../../apiClient";
import Layout from "../../components/Layout";
import EventModal from "./EventModal";
import { IEvent } from "../../interfaces";
import ConfirmationModal from "../../components/ConfirmationModal";
import DataTable from "../../components/DataTable"; 
import { useAuth } from "../../context/AuthContext";

const EventsList: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<IEvent[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [eventToDelete, setEventToDelete] = useState<IEvent | null>(null);
    const [filterUpcoming, setFilterUpcoming] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const filteredEvents = user?.role === 'organisateur' 
                    ? response.data.filter((obj: IEvent) => obj.createur.id_user === user.id_user) //Attente backend 
                    : response.data;

                setEvents(filteredEvents);
            } catch (error) {
                toast.error("Erreur lors de la récupération des évènements !");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleOpenModal = (event: IEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleEdit = (event: IEvent) => {
        navigate(`/events/update/${event.id_event}`);
    };

    const handleAddEvent = () => {
        navigate("/events/create");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleOpenConfirmation = (event: IEvent) => {
        setEventToDelete(event);
        setIsConfirmationOpen(true);
    };

    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;

        try {
            await apiClient.delete(`/events/${eventToDelete.id_event}`);
            setEvents((prevEvents) => prevEvents ? prevEvents.filter((e) => e.id_event !== eventToDelete.id_event) : []);
            toast.success("Événement supprimé avec succès !");
        } catch (error) {
            console.error("Erreur de suppression:", error);
            toast.error("Échec de la suppression de l'événement.");
        } finally {
            setIsConfirmationOpen(false);
            setEventToDelete(null);
        }
    };

    const filteredEvents = useMemo(() => {
        if(events) {
            return events.filter((event) => {
                const currentDate = new Date();
                const eventDate = new Date(event.date_debut);
                return filterUpcoming ? eventDate >= currentDate : eventDate < currentDate;
            });
        }

        return [];
    }, [events, filterUpcoming]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    // Définition des colonnes du DataTable
    const columns = [
        {
            label: "Titre",
            key: "titre" as keyof IEvent,  
            render: (event: IEvent) => (
                <div className="flex items-center gap-2">
                    {(event.programs.length === 0 || event.medias.length === 0) && (
                        <AlertTriangle size={16} className="text-red-500" />
                    )}
                    {event.titre}
                </div>
            ),
        },
        {
            label: "Description",
            key: "description" as keyof IEvent,  
            render: (event: IEvent) => event.description,
        },
        {
            label: "Date début",
            key: "date_debut" as keyof IEvent,  
            render: (event: IEvent) => dayjs(event.date_debut).format("DD/MM/YYYY"),
        },
        {
            label: "Date fin",
            key: "date_fin" as keyof IEvent,  
            render: (event: IEvent) => dayjs(event.date_fin).format("DD/MM/YYYY"),
        },
        {
            label: "Lieu",
            key: "lieu" as keyof IEvent,  
            render: (event: IEvent) => event.lieu.adresse,
        },
        {
            label: "Actions",
            key: "actions" as keyof IEvent,  
            render: (event: IEvent) => (
                <div className="flex items-center gap-3">
                    <Eye size={16} className="cursor-pointer text-green-600" onClick={() => handleOpenModal(event)} />
                    <Edit size={16} className="cursor-pointer text-amber-500" onClick={() => handleEdit(event)} />
                    <Trash size={16} className="cursor-pointer text-red-600" onClick={() => handleOpenConfirmation(event)} />
                </div>
            ),
        },
    ];

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
                    <DataTable
                        data={filteredEvents}
                        columns={columns}  // Utilisation directe de columns
                    />
                ) : (
                    <div className="flex justify-center items-center p-8">
                        <h3 className="text-lg text-gray-600">Aucun événement à afficher.</h3>
                    </div>
                )}
            </div>

            <EventModal isOpen={isModalOpen} event={selectedEvent} onClose={handleCloseModal} />

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title={eventToDelete?.titre ?? "Cet événement"}
                type="événement"
                onConfirm={handleDeleteEvent}
                onCancel={() => setIsConfirmationOpen(false)}
                setObjectToDelete={setEventToDelete}
                setIsConfirmationOpen={setIsConfirmationOpen}
                objectToDelete={eventToDelete ? { id: eventToDelete.id_event } : null} 
                setObject={setEvents}
                objects={events}
                idKey='id_event'
            />
        </Layout>
    );
};

export default EventsList;
