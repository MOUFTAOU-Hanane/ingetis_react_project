import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ILieu } from "../../../../interfaces";
import Layout from "../../../../components/Layout";
import LieuModal from "./LieuModal";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import LieuTable from "../../../../components/lieu/LieuTable";
import { lieuService } from "../../../../services/lieuService";
import AddButton from "../../../../components/Button";

const LieuxList: React.FC = () => {
    const navigate = useNavigate();
    const [lieux, setLieux] = useState<ILieu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedLieu, setSelectedLieu] = useState<ILieu | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [lieuToDelete, setLieuToDelete] = useState<ILieu | null>(null);

    useEffect(() => {
        const fetchLieux = async () => {
            try {
                const data = await lieuService.fetchAll();
                setLieux(data);
            } catch (error) {
                console.error("Failed to fetch lieux:", error);
                toast.error("Il y a eu une erreur lors de la récupération des lieux !");
            } finally {
                setLoading(false);
            }
        };

        fetchLieux();
    }, []);

    const handleOpenModal = (lieu: ILieu) => {
        setSelectedLieu(lieu);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLieu(null);
    };

    const handleEdit = (lieu: ILieu) => {
        navigate(`/admin/lieux/update/${lieu.id_lieu}`);
    };

    const handleOpenConfirmation = (lieu: ILieu) => {
        setLieuToDelete(lieu);
        setIsConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setLieuToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!lieuToDelete) return;

        try {
            await lieuService.delete(lieuToDelete.id_lieu);
            setLieux(lieux.filter((lieu) => lieu.id_lieu !== lieuToDelete.id_lieu));
            toast.success("Lieu supprimé avec succès !");
            handleCloseConfirmation();
        } catch (error) {
            console.error("Failed to delete lieu:", error);
            toast.error("Erreur lors de la suppression du lieu !");
        }
    };

    const handleAddNewLieu = () => {
        navigate("/admin/lieux/create");
    };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <Layout title="Liste des lieux">
            <div className="p-6">
                <AddButton 
                    onClick={handleAddNewLieu} 
                    label="Ajouter un nouveau lieu" 
                />
            </div>
            <div className="p-6">
                <LieuTable
                    lieux={lieux}
                    onView={handleOpenModal}
                    onEdit={handleEdit}
                    onDelete={handleOpenConfirmation}
                />
            </div>

            {/* Modal pour afficher les détails du lieu */}
            <LieuModal 
                isOpen={isModalOpen} 
                lieu={selectedLieu} 
                onClose={handleCloseModal} 
            />

            {/* Modal de confirmation de suppression */}
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                title={lieuToDelete?.nom ?? "Anonyme"}
                type="lieu"
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseConfirmation}
                setObjectToDelete={setLieuToDelete}
                setIsConfirmationOpen={setIsConfirmationOpen}
                objectToDelete={lieuToDelete ? { id: lieuToDelete.id_lieu } : null}
                setObject={setLieux}
                objects={lieux}
                idKey="id_lieu"
            />
        </Layout>
    );
};

export default LieuxList;