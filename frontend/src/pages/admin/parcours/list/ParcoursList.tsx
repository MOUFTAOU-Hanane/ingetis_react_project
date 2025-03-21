import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../../components/Layout";
import ConfirmationDeleteParcours from "../delete/ConfirmationDeleteParcours";
import { IParcours } from "../../../../interfaces";
import { parcoursService } from "../../../../services/parcoursService";
import AddButton from "../../../../components/Button";
import ParcoursTable from "./ParcoursTable";

const ParcoursList: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State
    const [parcours, setParcours] = useState<IParcours[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [parcoursToDelete, setParcoursToDelete] = useState<IParcours | null>(null);

    // Fetch parcours data
    useEffect(() => {
        const fetchParcours = async () => {
        if (!id) return;
        
        try {
            const data = await parcoursService.fetchByLieuId(id);
            setParcours(data);
        } catch (error) {
            toast.error("Erreur lors du chargement des parcours");
        } finally {
            setLoading(false);
        }
        };

        fetchParcours();
    }, [id]);

    // Handlers
    const handleAddParcours = () => {
        navigate("/admin/parcours/create");
    };

    const handleEdit = (parcours: IParcours) => {
        navigate(`/admin/parcours/update/${parcours.id_parcours}`);
    };

    const handleOpenConfirmation = (parcours: IParcours) => {
        setParcoursToDelete(parcours);
        setIsConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setParcoursToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!parcoursToDelete) return;

        try {
            if(parcoursToDelete.id_parcours) {
                await parcoursService.delete(parcoursToDelete.id_parcours);
                setParcours(parcours.filter(
                    (p) => p.id_parcours !== parcoursToDelete.id_parcours
                ));
                toast.success("Parcours supprimé avec succès !");
                handleCloseConfirmation();
            }
        } catch (error) {
         toast.error("Erreur lors de la suppression du parcours !");
        }
    };

    if (loading) {
        return <h5>Attente</h5>;
    }

    return (
        <Layout title="Liste des parcours">
            <div className="p-6">
                <AddButton onClick={handleAddParcours} label={"Ajouter un parcours"} />
                
                <ParcoursTable 
                    parcours={parcours} 
                    onEdit={handleEdit} 
                    onDelete={handleOpenConfirmation} 
                />
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