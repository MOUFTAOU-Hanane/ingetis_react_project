import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Save } from "lucide-react"; // Icônes
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ILieu } from "../../../interfaces";

const validationSchema = Yup.object({
    nom: Yup.string()
        .required("Le nom est requis")
        .max(100, "Le nom doit contenir au maximum 100 caractères"),
    adresse: Yup.string()
        .required("L'adresse est requise")
        .max(255, "L'adresse doit contenir au maximum 255 caractères"),
    latitude: Yup.number()
        .required("La latitude est requise")
        .typeError("La latitude doit être un nombre"),
    longitude: Yup.number()
        .required("La longitude est requise")
        .typeError("La longitude doit être un nombre"),
    description: Yup.string().max(500, "La description doit contenir au maximum 500 caractères"),
});

const CreateLieu: React.FC = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [createdLieuId, setCreatedLieuId] = useState<string | null>(null); 
    const [lieu, setLieu] = useState<ILieu>();

    useEffect(() => {
        if (id) {
            const fetchLieu = async () => {
                try {
                    const response = await apiClient.get(`/lieu/${id}`);
                    setLieu(response.data); 
                } catch (error) {
                    toast.error("Erreur lors de la récupération du lieu");
                    console.log({error});
                }
            };

            fetchLieu();
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            nom: lieu?.nom ?? "",
            adresse: lieu?.adresse ?? "",
            latitude: lieu?.latitude ?? "",
            longitude: lieu?.longitude ?? "",
            description: lieu?.description ?? ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (id) {
                    await apiClient.put(`/lieu/${id}`, values); 
                    toast.success("Lieu mis à jour !");
                } else {
                    const response = await apiClient.post("/lieu", values); 
                    toast.success("Lieu créé !");
                    setCreatedLieuId(response.data?.lieu?.id_lieu ?? null); 
                    setOpenModal(true); 
                }
                resetForm();
            } catch (error) {
                toast.error("Erreur lors de l'enregistrement du lieu");
                console.log({error});
            }
        },
    });

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddParcours = () => {
        setOpenModal(false);
        if (createdLieuId) {
            navigate(`/admin/lieux/${createdLieuId}/parcours/create`); // Rediriger vers la page de création de parcours avec l'ID
        }
    };

    return (
        <Layout title={`${id ? "Modifier le " : "Créer un "}lieu`}>
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
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {/* Champ Nom */}
                        <TextField
                            size="small"
                            fullWidth
                            id="nom"
                            name="nom"
                            label="Nom du lieu"
                            value={formik.values.nom}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nom && Boolean(formik.errors.nom)}
                            helperText={formik.touched.nom && formik.errors.nom}
                        />

                        {/* Champ Adresse */}
                        <TextField
                            size="small"
                            fullWidth
                            id="adresse"
                            name="adresse"
                            label="Adresse"
                            value={formik.values.adresse}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                            helperText={formik.touched.adresse && formik.errors.adresse}
                        />

                        {/* Champ Latitude */}
                        <TextField
                            size="small"
                            fullWidth
                            id="latitude"
                            name="latitude"
                            label="Latitude"
                            value={formik.values.latitude}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                            helperText={formik.touched.latitude && formik.errors.latitude}
                        />

                        {/* Champ Longitude */}
                        <TextField
                            size="small"
                            fullWidth
                            id="longitude"
                            name="longitude"
                            label="Longitude"
                            value={formik.values.longitude}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                            helperText={formik.touched.longitude && formik.errors.longitude}
                        />

                        {/* Champ Description */}
                        <TextField
                            size="small"
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        {/* Bouton Soumettre */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<Save size={16} />}
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                backgroundColor: "#4f46e5",
                                ":hover": { backgroundColor: "#4338ca" },
                            }}
                        >
                            Sauvegarder
                        </Button>
                    </Box>
                </form>

                {/* Modal de confirmation */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Lieu créé avec succès !</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Voulez-vous ajouter un parcours pour ce lieu ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">
                            Plus tard
                        </Button>
                        <Button onClick={handleAddParcours} variant="contained" color="primary">
                            Oui
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default CreateLieu;
