import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import Layout from "../../components/Layout";
import OeuvreModal from "./OeuvreModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Oeuvre } from "../../interfaces";
import ConfirmationModal from "../../components/ConfirmationModal";
import apiClient from "../../apiClient";


const OeuvresList: React.FC = () => {
    const navigate = useNavigate();
    const [oeuvres, setOeuvres] = useState<Oeuvre[]>();
    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [oeuvreToDelete, setOeuvreToDelete] = useState<Oeuvre | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/oeuvres'); 
                setOeuvres(response.data);
            } catch (error) {
                toast.error("Erreur lors de la récupération des oeuvres !");
                console.log(error);
            }
        };

        fetchEvents();
    }, []);

    const handleOpenModal = (oeuvre: Oeuvre) => {
        setSelectedOeuvre(oeuvre);
        setIsModalOpen(true);
    };

    const handleEdit = (oeuvre: Oeuvre) => {
        navigate(`/oeuvres/update/${oeuvre.id_oeuvre}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOeuvre(null);
    };

    const handleOpenConfirmation = (oeuvre: Oeuvre) => {
        setOeuvreToDelete(oeuvre);
        setIsConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setOeuvreToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!oeuvreToDelete) return;

        try {
            // Simulate API call
            setOeuvres(oeuvres.filter((oeuvre) => oeuvre.id_oeuvre !== oeuvreToDelete.id_oeuvre));
            toast.success("Œuvre supprimée avec succès !");
            handleCloseConfirmation();
        } catch (error) {
            console.error("Failed to delete oeuvre:", error);
            toast.error("Erreur lors de la suppression de l'œuvre !");
        }
    };

    return (
        <Layout title="Liste des œuvres">
            <div className="p-6">
                <button
                    onClick={() => navigate("/oeuvres/create")}
                    className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={16} /> Ajouter un nouvel oeuvre
                </button>
            </div>
            <div className="p-6">
                {oeuvres.length ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-white">
                            <thead className="text-purple-500 bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Titre</th>
                                    <th className="px-6 py-3 text-left">Type</th>
                                    <th className="px-6 py-3 text-left">Prix</th>
                                    <th className="px-6 py-3 text-left">Image</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {oeuvres.map((oeuvre) => (
                                    <tr key={oeuvre.id_oeuvre} className="border-b hover:bg-purple-300 hover:text-gray-800">
                                        <td className="px-6 py-4">{oeuvre.titre}</td>
                                        <td className="px-6 py-4">{oeuvre.type}</td>
                                        <td className="px-6 py-4">{oeuvre.prix} €</td>
                                        <td className="px-6 py-4">
                                            <img src={oeuvre.image} alt={oeuvre.titre} className="h-12 w-12 object-cover" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Eye
                                                    size={16}
                                                    className="cursor-pointer text-green-400"
                                                    onClick={() => handleOpenModal(oeuvre)}
                                                />
                                                <Edit
                                                    size={16}
                                                    className="cursor-pointer text-blue-400"
                                                    onClick={() => handleEdit(oeuvre)}
                                                />
                                                <Trash
                                                    size={16}
                                                    className="cursor-pointer text-red-400"
                                                    onClick={() => handleOpenConfirmation(oeuvre)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-8">
                        <h3 className="text-lg text-white">Pas encore d'œuvres à afficher.</h3>
                    </div>
                )}
            </div>

            <OeuvreModal isOpen={isModalOpen} oeuvre={selectedOeuvre} onClose={handleCloseModal} />
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title="Confirmation de suppression"
                type="œuvre"
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
                setIsConfirmationOpen={setIsConfirmationOpen}
                setObjectToDelete={setOeuvreToDelete}
                objectToDelete={oeuvreToDelete ? { id: oeuvreToDelete.id_oeuvre } : null}
                setObject={setOeuvres}
                objects={oeuvres}
                idKey="id_oeuvre"
            />
        </Layout>
    );
};

export default OeuvresList;
