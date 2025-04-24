import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { IUser } from "../../../interfaces";
import apiClient from "../../../apiClient";
import { toast } from "react-toastify";

interface ClientEditInfoProps {
    user: IUser;
    onClose: () => void;
}

const ClientEditInfo: React.FC<ClientEditInfoProps> = ({ user, onClose }) => {
    const formik = useFormik({
        initialValues: {
            id_user: user?.id_user,
            bibliographie: user?.bibliographie || "",
            role: user?.role,
            nom: user?.nom || "",
            email: user?.email || "",
            telephone: user?.telephone || "",
        },
        validationSchema: Yup.object({
            nom: Yup.string().required("Le nom est requis"),
            email: Yup.string().email("Email invalide").required("L'email est requis"),
            telephone: Yup.string()
                .matches(/^[0-9]+$/, "Numéro invalide")
                .required("Le téléphone est requis"),
        }),
        onSubmit: async (values) => {
            try {
                await apiClient.put(`/profile/${values.id_user}`, values);
                toast.success("Infos modifiées avec succès !");
                onClose();
                
            } catch (error) {
                toast.error("Une erreur a été produite !");
            }
        },
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-25 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Modifier les informations</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={formik.values.nom}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.nom && formik.errors.nom && (
                            <p className="text-red-500 text-sm">{formik.errors.nom}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Téléphone</label>
                        <input
                            type="text"
                            name="telephone"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.telephone && formik.errors.telephone && (
                            <p className="text-red-500 text-sm">{formik.errors.telephone}</p>
                        )}
                    </div>
                    {/* <div>
                        <label className="block text-sm text-gray-600">Bibliographie</label>
                        <input
                            type="text"
                            name="bibliographie"
                            className="w-full border rounded-lg p-2 mt-1"
                            value={formik.values.bibliographie}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.bibliographie && formik.errors.bibliographie && (
                            <p className="text-red-500 text-sm">{formik.errors.bibliographie}</p>
                        )}
                    </div> */}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100">
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientEditInfo;
