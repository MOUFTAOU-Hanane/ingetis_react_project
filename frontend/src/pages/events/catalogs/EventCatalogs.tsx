import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
    Button
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { ICatalog, IEvent } from "../../../interfaces";
import apiClient from "../../../apiClient";
import CatalogsList from "./CatalogsList";
import CatalogForm from "./CatalogForm";
import EventInfo from "../EventInfo";

const EventCatalogs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [catalog, setCatalog] = useState<ICatalog | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const event = response.data.find((event: IEvent) => event.id_event === parseInt(id || "0"));
                setEventSelected(event);

                if (event) {
                    setCatalog(event.catalogs?.[0] || null);
                } else {
                    toast.error("Événement non trouvé.");
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des programmes !");
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeleteCatalog = async () => {
        try {
            await apiClient.delete(`/catalogs/${catalog?.id_catalog}`);

            setCatalog(null);
            toast.success("Catalogue supprimé avec succès !");
        } catch (error) {
            console.log({error})
            toast.error("Erreur lors de la suppression");
        }
    };    

    return (
        <Layout title={`Catalogue de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <EventInfo eventSelected={eventSelected} actualPage="programs"/>

            <Button variant="contained" color="secondary" startIcon={<Plus />} onClick={handleOpenModal}>
                {catalog ? "Modifier le catalogue" : "Ajouter un catalogue"}
            </Button>
            {catalog && (
                <CatalogsList 
                    catalog={catalog} 
                    handleDeleteCatalog={handleDeleteCatalog} 
                    handleOpenModal={handleOpenModal} 
                />
            )}

            {/* Modal */}
            <CatalogForm 
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal} 
                catalog={catalog} 
                eventSelected={eventSelected}
                setCatalog={setCatalog}
            />
        </Layout>
    );
};

export default EventCatalogs;
