import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../../components/Layout";
import { ILieu, IParcours } from "../../../../interfaces";
import ParcoursForm from "./ParcoursForm";
import { parcoursService } from "../../../../services/parcoursService";

interface FormValues {
    parcours: IParcours[];
}

const AddParcours: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [lieu, setLieu] = useState<ILieu | null>(null);

    const validationSchema = Yup.object({
        parcours: Yup.array()
            .of(
                Yup.object({
                nom: Yup.string()
                    .required("Le nom est requis")
                    .max(100, "Le nom doit contenir au maximum 100 caractères"),
                description: Yup.string().max(
                    500,
                    "La description doit contenir au maximum 500 caractères"
                ),
                })
            )
            .min(1, "Vous devez ajouter au moins un parcours"),
    });

    const formik = useFormik<FormValues>({
            initialValues: {
            parcours: [{  nom: "", description: "" }],
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (id) {
                    await parcoursService.create(id, values.parcours);
                    toast.success("Parcours ajoutés avec succès !");
                    navigate(`/admin/lieux`);
                }
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
                    const lieuData = await parcoursService.fetchById(id);
                    setLieu(lieuData);
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
                <ParcoursForm
                    formik={formik}
                    handleAddParcours={handleAddParcours}
                    handleRemoveParcours={handleRemoveParcours}
                />
            </Box>
            </Layout>
    );
};

export default AddParcours;