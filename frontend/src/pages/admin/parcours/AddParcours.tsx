import React, { useEffect, useState } from "react";
import { useFormik, FormikErrors } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";
import { useParams, useNavigate } from "react-router-dom";

interface Parcours {
    nom: string;
    description: string;
}

interface FormValues {
    parcours: Parcours[];
}

type Lieu = {
    id: number;
    nom: string;
    adresse?: string;
    latitude?: string;
    longitude?: string;
    description?: string;
};

const AddParcours: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lieu, setLieu] = useState<Lieu | null>(null);

    const validationSchema = Yup.object({
        parcours: Yup.array()
            .of(
                Yup.object({
                    nom: Yup.string()
                        .required("Le nom est requis")
                        .max(100, "Le nom doit contenir au maximum 100 caractères"),
                    description: Yup.string().max(500, "La description doit contenir au maximum 500 caractères"),
                })
            )
            .min(1, "Vous devez ajouter au moins un parcours"),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            parcours: [{ nom: "", description: "" }],
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await apiClient.post(`/admin/lieux/${id}/parcours`, values.parcours);
                toast.success("Parcours ajoutés avec succès !");
                navigate(`/admin/lieux`);
            } catch (error) {
                toast.error("Erreur lors de l'ajout des parcours");
            }
        },
    });

    const handleAddParcours = () => {
        formik.setValues((prevValues) => ({
            parcours: [...prevValues.parcours, { nom: "", description: "" }],
        }));
    };

    const handleRemoveParcours = (index: number) => {
        formik.setValues((prevValues) => ({
            parcours: prevValues.parcours.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {
        const fetchLieu = async () => {
            try {
                if (id) {
                    const response = await apiClient.get(`/admin/lieux/${id}`);
                    
                    setLieu(response.data);
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération du lieu !");
            }
        };
    
        fetchLieu();
    }, [id]);

    return (
        <Layout title={`Ajouter des parcours pour le lieu : ${lieu?.nom ?? 'Indéfini'}`}>
            <Box
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    padding: 3,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                }}
            >

                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {formik.values.parcours.map((parcours, index) => (
                            <Box
                                key={index}
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                border="1px solid #e5e7eb"
                                borderRadius="8px"
                                padding={2}
                                position="relative"
                                sx={{ backgroundColor: "#f9f9f9" }}
                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    id={`parcours.${index}.nom`}
                                    name={`parcours.${index}.nom`}
                                    label="Nom du parcours"
                                    value={formik.values.parcours[index].nom}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        !!formik.touched.parcours?.[index]?.nom &&
                                        !!(formik.errors.parcours as any)?.[index]?.nom
                                    }
                                    helperText={
                                        formik.touched.parcours?.[index]?.nom &&
                                        (formik.errors.parcours as any)?.[index]?.nom
                                    }
                                />

                                <TextField
                                    size="small"
                                    fullWidth
                                    id={`parcours.${index}.description`}
                                    name={`parcours.${index}.description`}
                                    label="Description du parcours"
                                    multiline
                                    rows={2}
                                    value={formik.values.parcours[index].description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        !!formik.touched.parcours?.[index]?.description &&
                                        !!(formik.errors.parcours as any)?.[index]?.description
                                    }
                                    helperText={
                                        formik.touched.parcours?.[index]?.description &&
                                        (formik.errors.parcours as any)?.[index]?.description
                                    }
                                />

                                <IconButton
                                    onClick={() => handleRemoveParcours(index)}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        color: "#ef4444",
                                    }}
                                >
                                    <Trash2 size={16} />
                                </IconButton>
                            </Box>
                        ))}

                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            startIcon={<Plus size={16} />}
                            onClick={handleAddParcours}
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                borderColor: "#4f46e5",
                                color: "#4f46e5",
                                ":hover": {
                                    backgroundColor: "#ede9fe",
                                    borderColor: "#4f46e5",
                                },
                            }}
                        >
                            Ajouter un parcours
                        </Button>

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
                            Sauvegarder tous les parcours
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
};

export default AddParcours;