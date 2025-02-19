import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { MapPin, Save } from "lucide-react"; // Icônes
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";
import { useParams } from "react-router-dom";

// Validation du formulaire avec Yup
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
    const { id } = useParams(); // Récupérer l'ID du lieu depuis l'URL

    // Gestion du formulaire avec Formik
    const formik = useFormik({
        initialValues: {
            nom: "",
            adresse: "",
            latitude: "",
            longitude: "",
            description: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (id) {
                    await apiClient.put(`/admin/lieux/${id}`, values); // Mise à jour du lieu
                    toast.success("Lieu mis à jour !");
                } else {
                    await apiClient.post("/admin/lieux", values); // Création du lieu
                    toast.success("Lieu créé !");
                }
                resetForm();
                toast.success("Sauvegarde effectuée !");
            } catch (error) {
                toast.error("Erreur lors de l'enregistrement du lieu");
            }
        },
    });

    useEffect(() => {
        if (id) {
            // Si un ID est présent, récupérer les données du lieu
            const fetchLieu = async () => {
                try {
                    const response = await apiClient.get(`/admin/lieux/${id}`);
                    formik.setValues(response.data); // Remplir le formulaire avec les données
                } catch (error) {
                    toast.error("Erreur lors de la récupération du lieu");
                }
            };

            fetchLieu();
        }
    }, [id, formik]);

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
            </Box>
        </Layout>
    );
};

export default CreateLieu;
