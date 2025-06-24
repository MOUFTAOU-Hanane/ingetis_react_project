import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../apiClient";

const validationSchema = Yup.object({
    titre: Yup.string().required("Le titre est requis").max(100, "Maximum 100 caractères"),
    description: Yup.string().max(500, "Maximum 500 caractères"),
    prix: Yup.number().required("Le prix est requis").positive("Le prix doit être un nombre valide"),
    type: Yup.string().required("Le type est requis")
});

const CreateOrEditOeuvre: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [loading, setLoading] = useState<boolean>(!!id);

    const formik = useFormik({
        initialValues: {
            id_user: user?.id_user ?? null,
            titre: "",
            description: "",
            prix: "",
            type: "image",
            image: null,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            
            try {
                if (id) {
                    await apiClient.put(`/oeuvres/${id}`, values);

                    toast.success("Œuvre mise à jour avec succès !");
                } else {
                    await apiClient.post('/oeuvres', values);

                    toast.success("Œuvre créée avec succès !");
                }
                navigate("/oeuvres");
                resetForm();
            } catch (error) {
                toast.error("Erreur lors de l'enregistrement de l'œuvre !");
                console.log({error})
            }
        },
    });

    useEffect(() => {
        if (id) {
            // Simuler la récupération des données d'une œuvre via API
            setTimeout(() => {
                formik.setValues({
                    id_user: user?.id_user ?? null,
                    titre: "Oeuvre exemple",
                    description: "Description de l'œuvre",
                    prix: "200",
                    type: "peinture",
                    image: null,
                });
                setLoading(false);
            }, 1000);
        }
    }, [id]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            formik.setFieldValue("image", file);
        }
    };
    
    return (
        <Layout title={id ? "Modifier une œuvre" : "Créer une œuvre"}>
            <Box
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    padding: 3,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "white",
                }}
            >
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Titre"
                                {...formik.getFieldProps("titre")}
                                error={formik.touched.titre && Boolean(formik.errors.titre)}
                                helperText={formik.touched.titre && formik.errors.titre}
                            />

                            <TextField
                                size="small"
                                fullWidth
                                label="Description"
                                multiline
                                rows={3}
                                {...formik.getFieldProps("description")}
                            />

                            <TextField
                                size="small"
                                fullWidth
                                label="Prix"
                                type="number"
                                {...formik.getFieldProps("prix")}
                                error={formik.touched.prix && Boolean(formik.errors.prix)}
                                helperText={formik.touched.prix && formik.errors.prix}
                            />

                            <FormControl fullWidth size="small" error={formik.touched.type && Boolean(formik.errors.type)}>
                                <InputLabel>Type</InputLabel>
                                <Select label="Type" {...formik.getFieldProps("type")}>
                                    <MenuItem value="image">Image</MenuItem>
                                    <MenuItem value="peinture">Peinture</MenuItem>
                                    <MenuItem value="sculpture">Sculpture</MenuItem>
                                    <MenuItem value="vidéo">Vidéo</MenuItem>
                                </Select>
                            </FormControl>

                            <>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Télécharger une image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                {/* Affichage du nom du fichier sélectionné */}
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Fichier sélectionné"
                                    value={formik.values.image ? formik.values.image?.name : ""}
                                    InputProps={{ readOnly: true }}
                                    error={formik.touched.image && Boolean(formik.errors.image)}
                                    helperText={formik.touched.image && formik.errors.image}
                                />
                            </>

                            <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<Save size={16} />}>
                                {id ? "Mettre à jour" : "Sauvegarder"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Layout>
    );
};

export default CreateOrEditOeuvre;
