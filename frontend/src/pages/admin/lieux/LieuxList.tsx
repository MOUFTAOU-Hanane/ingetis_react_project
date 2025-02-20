import React, { useEffect, useState } from "react";
import { MapPin, Edit, Trash, Eye, Plus, List } from "lucide-react"; // Ajout de l'icône "Plus"
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";
import LieuModal from "./LieuModal"; // Import du nouveau composant Modal
import ConfirmationModal from "./ConfirmationModal"; // Import du modal de confirmation
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface Lieu {
    id_lieu: number;
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    description: string;
}

const LieuxList: React.FC = () => {
    const navigate = useNavigate();
    const [lieux, setLieux] = useState<Lieu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedLieu, setSelectedLieu] = useState<Lieu | null>(null); // Pour stocker le lieu sélectionné pour le modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Pour contrôler l'ouverture du modal
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); // Contrôle du modal de confirmation
    const [lieuToDelete, setLieuToDelete] = useState<Lieu | null>(null); // Stocker le lieu à supprimer

    useEffect(() => {
        const fetchLieux = async () => {
            try {
                const response = await apiClient.get("/admin/lieux");
                setLieux(response.data);
            } catch (error) {
                console.error("Failed to fetch lieux:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLieux();
    }, []);

    // Fonction pour ouvrir le modal des détails
    const handleOpenModal = (lieu: Lieu) => {
        setSelectedLieu(lieu);
        setIsModalOpen(true);
    };

    const handleEdit = (lieu: Lieu) => {
        navigate(`/admin/lieux/update/${lieu.id_lieu}`);
    };

    // Rediriger vers la page pour ajouter un parcours
    const handleAddParcours = (lieu: Lieu) => {
        navigate(`/admin/lieux/${lieu.id_lieu}/parcours`);
    };

    // Fonction pour fermer le modal des détails
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLieu(null);
    };

    // Fonction pour ouvrir le modal de confirmation
    const handleOpenConfirmation = (lieu: Lieu) => {
        setLieuToDelete(lieu);
        setIsConfirmationOpen(true);
    };

    // Fonction pour fermer le modal de confirmation
    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setLieuToDelete(null);
    };

    // Fonction pour supprimer un lieu
    const handleConfirmDelete = async () => {
        if (!lieuToDelete) return;

        try {
            await apiClient.delete(`/admin/lieux/${lieuToDelete.id_lieu}`); // Suppression via l'API
            setLieux(lieux.filter((lieu) => lieu.id_lieu !== lieuToDelete.id_lieu)); // Mise à jour de la liste localement
            toast.success("Lieu supprimé avec succès !");
            handleCloseConfirmation(); // Fermer le modal de confirmation
        } catch (error) {
            console.error("Failed to delete lieu:", error);
            toast.success("Erreur lors de la suppression du lieu !");
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
        <Layout title="Liste des lieux">
            <div className="p-6">
                {lieux && lieux?.length ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-white !hover:text-purple-500">
                            <thead className="text-purple-500 bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nom</th>
                                    <th className="px-6 py-3 text-left">Adresse</th>
                                    <th className="px-6 py-3 text-left">Latitude</th>
                                    <th className="px-6 py-3 text-left">Longitude</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lieux.map((lieu) => (
                                    <tr key={lieu.id_lieu} className="border-b hover:bg-purple-300 hover:text-gray-800">
                                        <td className="px-6 py-4">{lieu.nom}</td>
                                        <td className="px-6 py-4">{lieu.adresse}</td>
                                        <td className="px-6 py-4">{lieu.latitude}</td>
                                        <td className="px-6 py-4">{lieu.longitude}</td>
                                        <td className="px-6 py-4">{lieu.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Eye
                                                    size={16}
                                                    className="cursor-pointer text-green-400"
                                                    onClick={() => handleOpenModal(lieu)}
                                                />
                                                <Edit
                                                    size={16}
                                                    className="cursor-pointer text-blue-400"
                                                    onClick={() => handleEdit(lieu)}
                                                />
                                                <Trash
                                                    size={16}
                                                    className="cursor-pointer text-red-400"
                                                    onClick={() => handleOpenConfirmation(lieu)}
                                                />
                                                <List
                                                    size={16}
                                                    className="cursor-pointer text-purple-100"
                                                    onClick={() => handleAddParcours(lieu)}
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
                        <h3 className="text-lg text-white">Pas encore de lieux à afficher.</h3>
                    </div>
                )}
            </div>

            {/* Modal pour afficher les détails du lieu */}
            <LieuModal isOpen={isModalOpen} lieu={selectedLieu} onClose={handleCloseModal} />

            {/* Modal de confirmation de suppression */}
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title="Confirmation de suppression"
                lieuNom={lieuToDelete?.nom ?? "Anonyme"}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
            />
        </Layout>
    );
};

export default LieuxList;
