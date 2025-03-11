import React, { useEffect, useState } from "react";
import { Edit, Trash, List, Plus } from "lucide-react";
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";
import ConfirmationDeleteParcours from "./ConfirmationDeleteParcours"; // Modal de confirmation pour la suppression
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export interface Parcours {
    id_parcours: number;
    nom: string;
    description: string;
    lieu: string;
    date_debut: string;
    date_fin: string;
}

const ParcoursList: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [parcours, setParcours] = useState<Parcours[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedParcours, setSelectedParcours] = useState<Parcours | null>(null); // Pour stocker le parcours sélectionné pour le modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Pour contrôler l'ouverture du modal
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); // Contrôle du modal de confirmation
    const [parcoursToDelete, setParcoursToDelete] = useState<Parcours | null>(null); // Stocker le parcours à supprimer

    useEffect(() => {
        const fetchParcours = async () => {
            try {
                const response = await apiClient.get(`admin/lieux/${id}/parcours`);
                setParcours(response.data);
            } catch (error) {
                console.error("Failed to fetch parcours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchParcours();
    }, []);

    // Fonction pour ouvrir le modal des détails
    const handleOpenModal = (parcours: Parcours) => {
        setSelectedParcours(parcours);
        setIsModalOpen(true);
    };

    const handleEdit = (parcours: Parcours) => {
        navigate(`/admin/parcours/update/${parcours.id_parcours}`);
    };

    // Rediriger vers la page pour ajouter un parcours
    const handleAddParcours = () => {
        navigate("/admin/parcours/create");
    };

    // Fonction pour fermer le modal des détails
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedParcours(null);
    };

    // Fonction pour ouvrir le modal de confirmation
    const handleOpenConfirmation = (parcours: Parcours) => {
        setParcoursToDelete(parcours);
        setIsConfirmationOpen(true);
    };

    // Fonction pour fermer le modal de confirmation
    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setParcoursToDelete(null);
    };

    // Fonction pour supprimer un parcours
    const handleConfirmDelete = async () => {
        if (!parcoursToDelete) return;

        try {
            await apiClient.delete(`/admin/parcours/${parcoursToDelete.id_parcours}`); // Suppression via l'API
            setParcours(parcours.filter((parcours) => parcours.id_parcours !== parcoursToDelete.id_parcours)); // Mise à jour de la liste localement
            toast.success("Parcours supprimé avec succès !");
            handleCloseConfirmation(); // Fermer le modal de confirmation
        } catch (error) {
            console.error("Failed to delete parcours:", error);
            toast.error("Erreur lors de la suppression du parcours !");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <Layout title="Liste des parcours">
            <div className="p-6">
                <button
                    onClick={handleAddParcours}
                    className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2"
                >
                    <Plus size={16} /> Ajouter un nouveau
                </button>
                {parcours && parcours.length ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-500">
                            <thead className="bg-purple-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nom</th>
                                    <th className="px-6 py-3 text-left">Lieu</th>
                                    <th className="px-6 py-3 text-left">Date de début</th>
                                    <th className="px-6 py-3 text-left">Date de fin</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcours.map((parcours) => (
                                    <tr key={parcours.id_parcours} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-4">{parcours.nom}</td>
                                        <td className="px-6 py-4">{parcours.lieu}</td>
                                        <td className="px-6 py-4">{parcours.date_debut}</td>
                                        <td className="px-6 py-4">{parcours.date_fin}</td>
                                        <td className="px-6 py-4">{parcours.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Edit
                                                    size={16}
                                                    className="cursor-pointer text-blue-600"
                                                    onClick={() => handleEdit(parcours)}
                                                />
                                                <Trash
                                                    size={16}
                                                    className="cursor-pointer text-red-600"
                                                    onClick={() => handleOpenConfirmation(parcours)}
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
                        <h3 className="text-lg text-gray-600">Pas encore de parcours à afficher.</h3>
                    </div>
                )}
            </div>

            {/* Modal de confirmation de suppression */}
            <ConfirmationDeleteParcours
                isOpen={isConfirmationOpen}
                title="Confirmation de suppression"
                parcoursNom={parcoursToDelete?.nom ?? "Anonyme"}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
            />
        </Layout>
    );
};

export default ParcoursList;
