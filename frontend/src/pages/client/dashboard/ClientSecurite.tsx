import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../../apiClient';
import { IUser } from '../../../interfaces';
import { toast } from 'react-toastify';

interface IClientSecuriteProps {
    user: IUser;
}

const ClientSecurite: React.FC<IClientSecuriteProps> = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Ancien mot de passe requis'),
            newPassword: Yup.string().min(8, 'Au moins 8 caractères').required('Nouveau mot de passe requis'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Les mots de passe doivent correspondre')
                .required('Confirmez votre mot de passe')
        }),
        onSubmit: async (values) => {
            console.log('Mot de passe mis à jour :', values);
            try {
                await apiClient.put(`/users/password/${user.id_user}`, values);
                toast.success("Mot de passe changé avec succès !");
                toggleModal();
            } catch (error) {
                toast.success("Une erreur s'est produite !");
                toggleModal();
            }
        }
    });

    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Sécurité</h3>
            <div className="mt-3 space-y-3">
                <button onClick={toggleModal} className="text-purple-600 hover:text-purple-800 block">
                    Changer de mot de passe
                </button>
                {/* <button className="text-purple-600 hover:text-purple-800 block">
                    Activer l'authentification à deux facteurs
                </button> */}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-25">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Modifier le mot de passe</h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Ancien mot de passe</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    {...formik.getFieldProps('oldPassword')}
                                />
                                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                                    <div className="text-red-500 text-sm">{formik.errors.oldPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    {...formik.getFieldProps('newPassword')}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword ? (
                                    <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    {...formik.getFieldProps('confirmPassword')}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                                Modifier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientSecurite;
