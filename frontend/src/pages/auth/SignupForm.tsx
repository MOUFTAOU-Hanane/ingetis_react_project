import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Camera } from 'lucide-react';
import Layout from '../../components/Layout';

const validationSchema = Yup.object({
    nom: Yup.string().required('Nom est requis'),
    email: Yup.string().email('Email invalide').required('Email est requis'),
    motDePasse: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe est requis'),
    role: Yup.string().required('Rôle est requis'),
    photo: Yup.mixed().required('Photo est requise').nullable(),
    telephone: Yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Numéro de téléphone invalide').required('Téléphone est requis'),
    bibliographie: Yup.string().max(500, 'La bibliographie ne doit pas dépasser 500 caractères').required('Bibliographie est requise'),
});

interface FormValues {
    nom: string;
    email: string;
    motDePasse: string;
    role: 'admin' | 'user';
    photo: File | null;
    telephone: string;
    bibliographie: string;
}

const initialValues: FormValues = {
    nom: '',
    email: '',
    motDePasse: '',
    role: 'user',
    photo: null,
    telephone: '',
    bibliographie: '',
};

const SignupForm = () => {
    const handleSubmit = (values: FormValues) => {
        console.log('Form data', values);
        // Logique pour envoyer les données du formulaire
    };

    return (
        <Layout title="Page d'inscription">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({ setFieldValue, errors, touched }) => (
                <Form>
                    <div>
                        <Field
                        name="nom"
                        label="Nom"
                        fullWidth
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        error={Boolean(touched.nom && errors.nom)}
                        helperText={touched.nom && errors.nom}
                        />
                    </div>

                    <div>
                        <Field
                        name="email"
                        label="Email"
                        fullWidth
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        />
                    </div>

                    <div>
                        <Field
                        name="motDePasse"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        error={Boolean(touched.motDePasse && errors.motDePasse)}
                        helperText={touched.motDePasse && errors.motDePasse}
                        />
                    </div>

                    <div>
                        <FormControl fullWidth margin="normal" error={Boolean(touched.role && errors.role)}>
                        <InputLabel>Rôle</InputLabel>
                        <Field as={Select} name="role" label="Rôle">
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">Utilisateur</MenuItem>
                        </Field>
                        <FormHelperText>{touched.role && errors.role}</FormHelperText>
                        </FormControl>
                    </div>

                    <div>
                        <label htmlFor="photo">
                            <Button variant="contained" color="primary" component="span" startIcon={<Camera />}>
                                Télécharger une photo
                            </Button>
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                                if (event.target.files) {
                                setFieldValue('photo', event.target.files[0]);
                                }
                            }}
                        />
                        {touched.photo && errors.photo && <div>{errors.photo}</div>}
                    </div>

                    <div>
                        <Field
                            name="telephone"
                            label="Téléphone"
                            fullWidth
                            component={TextField}
                            variant="outlined"
                            margin="normal"
                            error={Boolean(touched.telephone && errors.telephone)}
                            helperText={touched.telephone && errors.telephone}
                        />
                    </div>

                    <div>
                        <Field
                            name="bibliographie"
                            label="Bibliographie"
                            fullWidth
                            component={TextField}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            error={Boolean(touched.bibliographie && errors.bibliographie)}
                            helperText={touched.bibliographie && errors.bibliographie}
                        />
                    </div>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        S'inscrire
                    </Button>
                </Form>
            )}
            </Formik>
        </Layout>
    );
};

export default SignupForm;
    