import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email est requis'),
    mot_de_passe: Yup.string().required('Mot de passe est requis'),
});

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            mot_de_passe: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await apiClient.post('/auth/login', values);

                if (response.status === 200) {
                    const { data } = response.data;
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data));
                    login(data);
                    toast.success('Connexion réussie !');
                    navigate('/admin/dashboard');
                }
            } catch (error: any) {
                if (error.response?.data) {
                    toast.error(`Erreur : ${error.response.data.message}`);
                } else {
                    toast.error('Une erreur inattendue est survenue.');
                }
            }
        },
    });

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-purple-700 to-purple-900 flex-col items-center justify-center p-12">
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-xl">Event Master</span>
                    </div>
                    <h1 className="text-3xl font-bold">Bienvenue à nouveau</h1>
                    <p className="text-lg opacity-80">Connectez-vous pour continuer</p>
                </div>
            </div>

            <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-2">Se connecter</h2>
                    <p className="text-gray-400 mb-6">Entrez vos informations pour continuer</p>

                    <form onSubmit={formik.handleSubmit}>
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

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#9333ea',
                                '&:hover': {
                                    backgroundColor: '#7e22ce',
                                },
                                borderRadius: '8px',
                                padding: '12px',
                                marginTop: '16px',
                                marginBottom: '12px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Se connecter
                        </Button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-400">
                            Vous n'avez pas de compte ? 
                            <NavLink to="/register" className="text-purple-500 hover:underline">
                                S'inscrire
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
