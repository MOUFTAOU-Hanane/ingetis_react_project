import React, { useState, useEffect } from "react";
import {
    Button
} from "@mui/material";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { IEvent } from "../../../interfaces";
import { IMedia } from "../../../interfaces";
import apiClient from "../../../apiClient";
import EventInfo from "../EventInfo";
import MediasList from "./MediasList";
import MediaForm from "./MediaForm";

const EventMedias: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [medias, setMedias] = useState<IMedia[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent>();
    const [currentMedia, setCurrentMedia] = useState<IMedia | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const event = response.data.find((event: IEvent) => event.id_event === parseInt(id || "0"));
                setEventSelected(event);

                if (event) {
                    setMedias(event.medias || []);
                } else {
                    toast.error("Événement non trouvé.");
                }

            } catch (error) {
                toast.error("Erreur lors de la récupération des médias !");
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (mediaToEdit?: IMedia) => {
        if (mediaToEdit) {
            setCurrentMedia(mediaToEdit);
        } else {
            setCurrentMedia(null);
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentMedia(null);
    };

    const handleDeleteMedia = (mediaId: number) => {
        setMedias(medias.filter((media) => media.id_media !== mediaId));
    };

    return (
        <Layout title={`Médias de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <EventInfo eventSelected={eventSelected} actualPage="medias" />

            <Button variant="contained" color="secondary" startIcon={<Plus />} onClick={() => handleOpenModal()}>
                Ajouter des médias
            </Button>

            <MediasList 
                medias={medias} 
                handleOpenModal={handleOpenModal} 
                handleDeleteMedia={handleDeleteMedia} 
            />
            
            {/* Modal */}
            <MediaForm 
                modalOpen={modalOpen} 
                handleCloseModal={handleCloseModal}
                currentMedia={currentMedia}
                medias={medias} 
                setMedias={setMedias}
            />
        </Layout>
    );
};

export default EventMedias;
