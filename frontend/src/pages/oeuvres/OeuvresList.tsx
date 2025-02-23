import React, { useState } from "react";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import Layout from "../../components/Layout";
import OeuvreModal from "./OeuvreModal";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface Oeuvre {
    id_oeuvre: number;
    id_user: number;
    titre: string;
    type: "image" | "peinture" | "sculpture" | "vidéo" | string;
    description: string;
    prix: number;
    image: string;
}

// Mock data for testing
const mockOeuvres: Oeuvre[] = [
    {
        id_oeuvre: 1,
        id_user: 101,
        titre: "La Nuit Étoilée",
        type: "peinture",
        description: "Une interprétation moderne d'un ciel nocturne avec des touches de bleu profond et d'or",
        prix: 1500,
        image: "/api/placeholder/400/400"
    },
    {
        id_oeuvre: 2,
        id_user: 102,
        titre: "Harmonie",
        type: "sculpture",
        description: "Sculpture contemporaine en bronze représentant l'harmonie des formes",
        prix: 2800,
        image: "/api/placeholder/400/400"
    },
    {
        id_oeuvre: 3,
        id_user: 103,
        titre: "Perspective Urbaine",
        type: "image",
        description: "Photographie urbaine en noir et blanc capturant l'essence de la ville",
        prix: 800,
        image: "/api/placeholder/400/400"
    },
    {
        id_oeuvre: 4,
        id_user: 104,
        titre: "Mouvement Perpétuel",
        type: "vidéo",
        description: "Installation vidéo explorant le concept du mouvement continu",
        prix: 1200,
        image: "/api/placeholder/400/400"
    },
    {
        id_oeuvre: 5,
        id_user: 105,
        titre: "Abstraction #3",
        type: "peinture",
        description: "Composition abstraite utilisant des couleurs vives et des formes géométriques",
        prix: 950,
        image: "/api/placeholder/400/400"
    }
];

const OeuvresList: React.FC = () => {
    const navigate = useNavigate();
    const [oeuvres, setOeuvres] = useState<Oeuvre[]>(mockOeuvres);
    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [oeuvreToDelete, setOeuvreToDelete] = useState<Oeuvre | null>(null);

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
                itemNom={oeuvreToDelete?.titre ?? "Anonyme"}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
            />
        </Layout>
    );
};

export default OeuvresList;