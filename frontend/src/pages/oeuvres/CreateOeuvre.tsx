import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
    titre: Yup.string().required("Le titre est requis").max(100, "Maximum 100 caractères"),
    description: Yup.string().max(500, "Maximum 500 caractères"),
    prix: Yup.number().required("Le prix est requis").positive("Le prix doit être un nombre valide"),
    type: Yup.string().required("Le type est requis"),
    image: Yup.string().url("L'image doit être une URL valide").required("L'image est requise"),
});

const CreateOrEditOeuvre: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [loading, setLoading] = useState<boolean>(!!id);

    const formik = useFormik({
        initialValues: {
            titre: "",
            description: "",
            prix: "",
            type: "image",
            image: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            try {
                if (id) {
                    // Simuler la mise à jour de l'œuvre via API
                    toast.success("Œuvre mise à jour avec succès !");
                } else {
                    // Simuler la création de l'œuvre via API
                    toast.success("Œuvre créée avec succès !");
                }
                navigate("/oeuvres");
                resetForm();
            } catch (error) {
                toast.error("Erreur lors de l'enregistrement de l'œuvre !");
            }
        },
    });

    useEffect(() => {
        if (id) {
            // Simuler la récupération des données d'une œuvre via API
            setTimeout(() => {
                formik.setValues({
                    titre: "Oeuvre exemple",
                    description: "Description de l'œuvre",
                    prix: "200",
                    type: "peinture",
                    image: "https://example.com/image.jpg",
                });
                setLoading(false);
            }, 1000);
        }
    }, [id]);

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

                            <TextField
                                size="small"
                                fullWidth
                                label="URL de l'image"
                                {...formik.getFieldProps("image")}
                                error={formik.touched.image && Boolean(formik.errors.image)}
                                helperText={formik.touched.image && formik.errors.image}
                            />

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
