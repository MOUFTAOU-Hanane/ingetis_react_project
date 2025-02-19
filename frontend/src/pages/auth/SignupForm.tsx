import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Camera } from 'lucide-react';

const validationSchema = Yup.object({
    nom: Yup.string().required('Nom est requis'),
    email: Yup.string().email('Email invalide').required('Email est requis'),
    mot_de_passe: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe est requis'),
    role: Yup.string().required('Rôle est requis'),
    photo: Yup.mixed().required('Photo est requise').nullable(),
    telephone: Yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Numéro de téléphone invalide').required('Téléphone est requis'),
    bibliographie: Yup.string().max(500, 'La bibliographie ne doit pas dépasser 500 caractères').required('Bibliographie est requise'),
});

interface FormValues {
    nom: string;
    email: string;
    mot_de_passe: string;
    role: 'admin' | 'user';
    photo: File | null;
    telephone: string;
    bibliographie: string;
}

const initialValues: FormValues = {
    nom: '',
    email: '',
    mot_de_passe: '',
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
        <div className="flex min-h-screen bg-black text-white">
            {/* Left side with gradient background */}
            <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-purple-700 to-purple-900 flex-col items-center justify-center p-12">
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-xl">Event Master</span>
                    </div>
                    <h1 className="text-3xl font-bold">Rejoignez-nous</h1>
                    <p className="text-lg opacity-80">Completez ces étapes pour créer un compte</p>
                </div>
            </div>
            
            {/* Right side with form */}
            <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
                    <p className="text-gray-400 mb-6">Ajoutez vos informations personnelles</p>
                    
                    <div className="relative flex justify-center mb-6">
                        <span className="bg-black px-4 text-gray-400">Or</span>
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                    </div>
                    
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnMount={false}
                    >
                        {({ setFieldValue, errors, touched, values }) => (
                            <Form>
                                <div>
                                    <Field
                                        name="nom"
                                        label="Nom"
                                        fullWidth
                                        component={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(touched.nom && errors.nom && !values.nom)}
                                        helperText={touched.nom && errors.nom && !values.nom ? errors.nom : ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            setFieldValue('nom', e.target.value)
                                        }
                                        placeholder="eg. John"
                                        InputProps={{
                                            style: { 
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: 'rgba(255,255,255,0.7)'
                                            }
                                        }}
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
                                        error={Boolean(touched.email && errors.email && !values.email)}
                                        helperText={touched.email && errors.email && !values.email ? errors.email : ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            setFieldValue('email', e.target.value)
                                        }
                                        placeholder="eg. johnfrancisco@gmail.com"
                                        InputProps={{
                                            style: { 
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: 'rgba(255,255,255,0.7)'
                                            }
                                        }}
                                    />
                                </div>
                            
                                <div>
                                    <Field
                                        name="mot_de_passe"
                                        label="Mot de passe"
                                        type="password"
                                        fullWidth
                                        component={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(touched.mot_de_passe && errors.mot_de_passe && !values.mot_de_passe)}
                                        helperText={touched.mot_de_passe && errors.mot_de_passe && !values.mot_de_passe ? errors.mot_de_passe : ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            setFieldValue('mot_de_passe', e.target.value)
                                        }
                                        placeholder="Entrer votre mot de passe"
                                        InputProps={{
                                            style: { 
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: 'rgba(255,255,255,0.7)'
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Au moins 8 caractères</p>
                                </div>
                            
                                <div>
                                    <FormControl 
                                        fullWidth 
                                        margin="normal" 
                                        error={Boolean(touched.role && errors.role && !values.role)}
                                        style={{ 
                                            backgroundColor: '#1a1a1a',
                                            borderRadius: '8px',
                                            marginTop: '16px', 
                                            marginBottom: '8px' 
                                        }}
                                    >
                                        <InputLabel style={{ color: 'rgba(255,255,255,0.7)' }}>Rôle</InputLabel>
                                        <Field
                                            as={Select}
                                            name="role"
                                            label="Rôle"
                                            style={{ color: 'white' }}
                                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => 
                                                setFieldValue('role', e.target.value)
                                            }
                                        >
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="user">Utilisateur</MenuItem>
                                        </Field>
                                        {touched.role && errors.role && !values.role && (
                                            <FormHelperText error>{errors.role}</FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                            
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
                                                textTransform: 'none'
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
                                        onChange={(event) => {
                                            if (event.target.files) {
                                                setFieldValue('photo', event.target.files[0]);
                                            }
                                        }}
                                    />
                                    {touched.photo && errors.photo && !values.photo && (
                                        <div className="text-red-500 text-sm mt-1">{errors.photo}</div>
                                    )}
                                </div>
                            
                                <div>
                                    <Field
                                        name="telephone"
                                        label="Téléphone"
                                        fullWidth
                                        component={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(touched.telephone && errors.telephone && !values.telephone)}
                                        helperText={touched.telephone && errors.telephone && !values.telephone ? errors.telephone : ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            setFieldValue('telephone', e.target.value)
                                        }
                                        InputProps={{
                                            style: { 
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: 'rgba(255,255,255,0.7)'
                                            }
                                        }}
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
                                        error={Boolean(touched.bibliographie && errors.bibliographie && !values.bibliographie)}
                                        helperText={touched.bibliographie && errors.bibliographie && !values.bibliographie ? errors.bibliographie : ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            setFieldValue('bibliographie', e.target.value)
                                        }
                                        InputProps={{
                                            style: { 
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: 'rgba(255,255,255,0.7)'
                                            }
                                        }}
                                    />
                                </div>
                            
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
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    
                    <div className="text-center mt-4">
                        <p className="text-gray-400">
                            Vous avez déjà un compte? <a href="#" className="text-purple-500 hover:underline">Se connecter</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;