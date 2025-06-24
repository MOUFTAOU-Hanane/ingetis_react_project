import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LieuForm from "./LieuForm";
import { ILieu } from "../../../../interfaces";
import Layout from "../../../../components/Layout";
import SuccessModal from "./SuccessModal";
import { lieuService } from "../../../../services/lieuService";

const CreateLieu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lieu, setLieu] = useState<ILieu | undefined>(undefined);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [createdLieuId, setCreatedLieuId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const loadLieu = async () => {
            if (!id) return;
            
            try {
                const data = await lieuService.fetchById(id);
                setLieu(data);
            } catch (error) {
                toast.error("Erreur lors de la récupération du lieu");
                console.error("Error fetching lieu:", error);
            }
        };

        loadLieu();
    }, [id]);

    const handleSubmit = async (values: Omit<ILieu, 'id_lieu'>) => {
        setIsSubmitting(true);
        try {
            if (id) {
                await lieuService.update(id, values);
                toast.success("Lieu mis à jour !");
                navigate('/admin/lieux');
            } else {
                const response = await lieuService.create(values);
                toast.success("Lieu créé !");
                setCreatedLieuId(response.nouveauLieu.id_lieu); // A vérifier
                setOpenModal(true);
            }
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement du lieu");
            console.error("Error saving lieu:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/admin/lieux');
    };

    const handleAddParcours = () => {
        setOpenModal(false);
        if (createdLieuId) {
            navigate(`/admin/lieux/${createdLieuId}/parcours`);
        }
    };

    return (
        <Layout title={`${id ? "Modifier le" : "Créer un"} lieu`}>
            <Box
                sx={{
                    maxWidth: 500,
                    margin: "auto",
                    padding: 3,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                }}
            >
                <LieuForm 
                    lieu={lieu} 
                    onSubmit={handleSubmit} 
                    isSubmitting={isSubmitting} 
                />

                <SuccessModal
                    open={openModal}
                    title="Lieu créé avec succès !"
                    message="Voulez-vous ajouter un parcours pour ce lieu ?"
                    confirmText="Oui"
                    cancelText="Plus tard"
                    onConfirm={handleAddParcours}
                    onCancel={handleCloseModal}
                />
            </Box>
        </Layout>
    );
};

export default CreateLieu;