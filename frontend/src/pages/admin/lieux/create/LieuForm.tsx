import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Box,
} from "@mui/material";
import { Save } from "lucide-react";
import { ILieu } from "../../../../interfaces";

interface LieuFormProps {
    lieu?: ILieu;
    onSubmit: (values: Omit<ILieu, 'id_lieu'>) => void;
    isSubmitting: boolean;
}

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

const LieuForm: React.FC<LieuFormProps> = ({ lieu, onSubmit, isSubmitting }) => {
    const formik = useFormik({
        initialValues: {
            nom: "",
            adresse: "",
            latitude: 0,
            longitude: 0,
            description: ""
        },
        validationSchema,
            onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        if (lieu) {
        formik.setValues({
            nom: lieu.nom ?? "",
            adresse: lieu.adresse ?? "",
            latitude: lieu.latitude ?? "",
            longitude: lieu.longitude ?? "",
            description: lieu.description ?? ""
        });
        }
    }, [lieu]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
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

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
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
    );
};

export default LieuForm;