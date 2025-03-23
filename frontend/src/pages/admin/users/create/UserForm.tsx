import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Mail, Phone, User, Book } from "lucide-react";
import FormField from "../../../../components/forms/FormField";
import FileUpload from "../../../../components/forms/FileUpload";
import { UserFormData } from "../../../../services/userService";

interface UserFormProps {
    onSubmit: (values: UserFormData) => Promise<void>;
    initialValues?: Partial<UserFormData>;
    loading?: boolean;
    error?: string | null;
}


const UserForm: React.FC<UserFormProps> = ({
    onSubmit,
    initialValues = {},
    loading = false,
    error = null,
}) => {
    const validationSchema = Yup.object({
        nom: Yup.string().required("Le nom est requis"),
        email: Yup.string().email("Email invalide").required("L'email est requis"),
        telephone: Yup.string().required("Le téléphone est requis"),
        bibliographie: Yup.string(),
        photo: Yup.mixed().required("La photo est requise").nullable(),
    });

    const formik = useFormik({
        initialValues: {
            nom: "",
            email: "",
            telephone: "",
            photo: null as File | null,
            bibliographie: "",
            ...initialValues,
        },
        validationSchema,
        onSubmit: async (values) => {
            await onSubmit(values);
        },
    });

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            {error && <Typography color="error" gutterBottom>{error}</Typography>}

            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={3}>
                    {/* Nom */}
                    <Grid item xs={12}>
                        <FormField
                            name="nom"
                            label="Nom"
                            value={formik.values.nom}
                            onChange={formik.handleChange}
                            error={formik.touched.nom && Boolean(formik.errors.nom)}
                            helperText={(formik.touched.nom && formik.errors.nom) as string}
                            icon={<User />}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                        <FormField
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) as string}
                            icon={<Mail />}
                        />
                    </Grid>

                    {/* Téléphone */}
                    <Grid item xs={12}>
                        <FormField
                            name="telephone"
                            label="Téléphone"
                            type="tel"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                            helperText={(formik.touched.telephone && formik.errors.telephone) as string}
                            icon={<Phone />}
                        />
                    </Grid>

                    {/* Photo */}
                    <Grid item xs={12}>
                        <FileUpload
                            name="photo"
                            onChange={(file) => formik.setFieldValue("photo", file)}
                            error={formik.errors.photo as string}
                            touched={formik.touched.photo}
                        />
                    </Grid>

                    {/* Bibliographie */}
                    <Grid item xs={12}>
                        <FormField
                            name="bibliographie"
                            label="Bibliographie"
                            value={formik.values.bibliographie}
                            onChange={formik.handleChange}
                            error={formik.touched.bibliographie && Boolean(formik.errors.bibliographie)}
                            helperText={(formik.touched.bibliographie && formik.errors.bibliographie) as string}
                            multiline
                            rows={4}
                            icon={<Book />}
                        />
                    </Grid>

                    {/* Boutons */}
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
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
    );
};

export default UserForm;
