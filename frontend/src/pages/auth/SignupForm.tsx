import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, CircularProgress } from '@mui/material';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import apiClient from '../../apiClient';
import { NavLink, useNavigate } from 'react-router-dom';

type SignupFormValues = {
    nom: string;
    email: string;
    mot_de_passe: string;
    role: string;
    photo: File | null;
    telephone: string;
    bibliographie: string;
};

const validationSchema = Yup.object({
    nom: Yup.string().required('Nom est requis'),
    email: Yup.string().email('Email invalide').required('Email est requis'),
    mot_de_passe: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe est requis'),
    role: Yup.string().required('Rôle est requis'),
    photo: Yup.mixed<File>().required('Photo est requise').nullable(),
    telephone: Yup.string().required('Téléphone est requis'),
    bibliographie: Yup.string().max(500, 'La bibliographie ne doit pas dépasser 500 caractères').required('Bibliographie est requise'),
});

const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formik = useFormik<SignupFormValues>({
        initialValues: {
            nom: '',
            email: '',
            mot_de_passe: '',
            role: 'user',
            photo: null,
            telephone: '',
            bibliographie: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            toast.loading("Inscription en cours...");

            try {
                toast.dismiss();

                const formData = new FormData();
                
                // Ajoute les champs au FormData
                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'photo' && value instanceof File) {
                        formData.append(key, value); // Ajoute le fichier photo
                    } else {
                        formData.append(key, value as string); // Ajoute les autres champs
                    }
                });
        
                // Effectue l'appel API avec l'en-tête multipart
                const response = await apiClient.post('/auth/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                if (response.status === 201) {
                    toast.success('Inscription réussie');
                    navigate('/login');
                }
            } catch (error: any) {
                toast.dismiss();

                if (error.response?.data) {
                    toast.error(`Erreur : ${error.response.data.message}`);
                } else {
                    toast.error('Une erreur inattendue est survenue.');
                }
            }

            setIsLoading(false);
        },
        
    });

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-purple-700 to-purple-900 flex-col items-center justify-center p-12">
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-xl">Event Culture</span>
                    </div>
                    <h1 className="text-3xl font-bold">Rejoignez-nous</h1>
                    <p className="text-lg opacity-80">Completez ces étapes pour créer un compte</p>
                </div>
            </div>

            <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
                    <p className="text-gray-400 mb-6">Ajoutez vos informations personnelles</p>

                    <div className="relative flex justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <TextField
                            fullWidth
                            id="nom"
                            name="nom"
                            label="Nom"
                            value={formik.values.nom}
                            onChange={formik.handleChange}
                            error={formik.touched.nom && Boolean(formik.errors.nom)}
                            helperText={formik.touched.nom && formik.errors.nom}
                            variant="outlined"
                            margin="normal"
                            placeholder="eg. John"
                            InputProps={{
                                style: {
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'rgba(255,255,255,0.7)',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            variant="outlined"
                            margin="normal"
                            placeholder="eg. johnfrancisco@gmail.com"
                            InputProps={{
                                style: {
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'rgba(255,255,255,0.7)',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            id="mot_de_passe"
                            name="mot_de_passe"
                            label="Mot de passe"
                            type="password"
                            value={formik.values.mot_de_passe}
                            onChange={formik.handleChange}
                            error={formik.touched.mot_de_passe && Boolean(formik.errors.mot_de_passe)}
                            helperText={formik.touched.mot_de_passe && formik.errors.mot_de_passe}
                            variant="outlined"
                            margin="normal"
                            placeholder="Entrer votre mot de passe"
                            InputProps={{
                                style: {
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'rgba(255,255,255,0.7)',
                                },
                            }}
                        />
                        <p className="text-xs text-gray-400 mt-1">Au moins 8 caractères</p>

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            style={{
                                backgroundColor: '#1a1a1a',
                                borderRadius: '8px',
                                marginTop: '16px',
                                marginBottom: '8px',
                            }}
                        >
                            <InputLabel style={{ color: 'rgba(255,255,255,0.7)' }}>Rôle</InputLabel>
                            <Select
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                label="Rôle"
                                style={{ color: 'white' }}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">Participant</MenuItem>
                                <MenuItem value="org">Organisateur</MenuItem>
                            </Select>
                            {formik.touched.role && formik.errors.role && (
                                <FormHelperText error>{formik.errors.role}</FormHelperText>
                            )}
                        </FormControl>

                        <div className="mt-4">
                            <label htmlFor="photo" className="block mb-2">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<Camera />}
                                    sx={{
                                        backgroundColor: '#333',
                                        '&:hover': {
                                            backgroundColor: '#444',
                                        },
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                    }}
                                >
                                    Télécharger une photo
                                </Button>
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        formik.setFieldValue('photo', e.target.files[0]);
                                    }
                                }}
                            />
                            {formik.touched.photo && formik.errors.photo && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
                            )}
                        </div>

                        <TextField
                            fullWidth
                            id="telephone"
                            name="telephone"
                            label="Téléphone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                            helperText={formik.touched.telephone && formik.errors.telephone}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                style: {
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'rgba(255,255,255,0.7)',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            id="bibliographie"
                            name="bibliographie"
                            label="Bibliographie"
                            value={formik.values.bibliographie}
                            onChange={formik.handleChange}
                            error={formik.touched.bibliographie && Boolean(formik.errors.bibliographie)}
                            helperText={formik.touched.bibliographie && formik.errors.bibliographie}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            InputProps={{
                                style: {
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'rgba(255,255,255,0.7)',
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: isLoading ? '#a3a3a3' : '#9333ea',
                                '&:hover': {
                                    backgroundColor: isLoading ? '#a3a3a3' : '#7e22ce',
                                },
                                borderRadius: '8px',
                                padding: '12px',
                                marginTop: '16px',
                                marginBottom: '12px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className='text-white flex gap-2 items-center'>
                                    <span>Chargement...</span>
                                    <CircularProgress size={16} sx={{ color: 'white' }} />
                                </div>
                            ) : (
                                'S\'inscrire'
                            )}                        
                        </Button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-400">
                            Vous avez déjà un compte?
                            <NavLink to="/login" className="text-purple-500 hover:underline">
                                Se connecter
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
