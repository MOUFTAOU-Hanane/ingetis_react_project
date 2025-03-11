import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Grid, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { Mail, Phone, User, Book } from "lucide-react"; // Utilisation de l'icône User
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";

const CreateUser: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Initialisation de Formik
    const formik = useFormik({
        initialValues: {
            nom: "",
            email: "",
            telephone: "",
            photo: null as File | null,
            bibliographie: "",
        },
        validationSchema: Yup.object({
            nom: Yup.string().required("Le nom est requis"),
            email: Yup.string().email("Email invalide").required("L'email est requis"),
            telephone: Yup.string().required("Le téléphone est requis"),
            bibliographie: Yup.string(),
            photo: Yup.mixed().required("La photo est requise").nullable(),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("nom", values.nom);
            formData.append("email", values.email);
            formData.append("telephone", values.telephone);
            formData.append("bibliographie", values.bibliographie);
            if (values.photo) {
                formData.append("photo", values.photo);
            }

            try {
                const response = await apiClient.post("/admin/users", formData);
                alert("Utilisateur créé avec succès !");
                // Réinitialiser ou rediriger après succès
            } catch (err) {
                setError("Erreur lors de la création de l'utilisateur.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Layout title="Créer un utilisateur">
            <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">

                {error && <Typography color="error" gutterBottom>{error}</Typography>}

                <form onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        {/* Nom */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nom"
                                name="nom"
                                value={formik.values.nom}
                                onChange={formik.handleChange}
                                error={formik.touched.nom && Boolean(formik.errors.nom)}
                                helperText={formik.touched.nom && formik.errors.nom}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <User />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Téléphone */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Téléphone"
                                name="telephone"
                                type="tel"
                                value={formik.values.telephone}
                                onChange={formik.handleChange}
                                error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                                helperText={formik.touched.telephone && formik.errors.telephone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Photo */}
                        <Grid item xs={12}>
                            <div className="bg-gray-500 p-2 text-white rounded-lg w-1/2 text-sm">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => formik.setFieldValue("photo", e.target.files ? e.target.files[0] : null)}
                                />
                            </div>
                            {formik.touched.photo && formik.errors.photo && (
                                <Typography color="error" variant="body2">{formik.errors.photo}</Typography>
                            )}
                        </Grid>

                        {/* Bibliographie */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Bibliographie"
                                name="bibliographie"
                                value={formik.values.bibliographie}
                                onChange={formik.handleChange}
                                error={formik.touched.bibliographie && Boolean(formik.errors.bibliographie)}
                                helperText={formik.touched.bibliographie && formik.errors.bibliographie}
                                multiline
                                rows={4}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Book />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Boutons */}
                        <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={4}>
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={24} /> : null}
                            >
                                {loading ? "Chargement..." : "Créer"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Layout>
    );
};

export default CreateUser;
