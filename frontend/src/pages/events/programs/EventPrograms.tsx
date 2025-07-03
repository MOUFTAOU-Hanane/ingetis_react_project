// src/pages/EventPrograms.tsx
import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { eventService } from "../../../services/eventService";
import { IEvent, IProgram } from "../../../interfaces";
import Layout from "../../../components/Layout";
import EventInfo from "../EventInfo";
import ProgramsList from "./ProgramsList";
import ProgramModal from "./ProgramModal";

const EventPrograms: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent | null>(null);
    const [currentProgram, setCurrentProgram] = useState<IProgram | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const eventId = parseInt(id || "0", 10);

    const fetchData = async () => {
        try {
            const events = await eventService.fetchEvents();
            const event = events.find((event) => event.id_event === eventId);
            
            if (event) {
                setEventSelected(event);
                setPrograms(event.programs || []);
            } else {
                toast.error("Événement non trouvé.");
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des programmes !");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleOpenModal = (programToEdit?: IProgram) => {
        setCurrentProgram(programToEdit || null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentProgram(null);
    };

    const handleSubmitProgram = async (programData: Partial<IProgram>) => {
        try {
            setIsSubmitting(true);

            if (currentProgram) {
                // Update existing program
                const updatedProgram = await eventService.updateProgram(
                    currentProgram.id_program!, 
                    {
                        titre: programData.titre!,
                        description: programData.description!,
                        date_heure: programData.date_heure!,
                        id_event: eventSelected?.id_event || undefined
                    }
                );
                
                setPrograms(programs.map((program) =>
                    program.id_program === currentProgram.id_program
                        ? updatedProgram
                        : program
                ));
                toast.success("Programme modifié avec succès !");
            } else {
                // Create new program
                const newProgram = await eventService.createProgram({ 
                    titre: programData.titre!,
                    description: programData.description!,
                    date_heure: programData.date_heure!,
                    id_event: eventSelected?.id_event || undefined
                });
                
                setPrograms([...programs, newProgram]);
                toast.success("Programme ajouté avec succès !");
            }
            
            handleCloseModal();
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'enregistrement du programme");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProgram = async (programId: number) => {
        try {
            await eventService.deleteProgram(programId);
            setPrograms(programs.filter((program) => program.id_program !== programId));
            toast.success("Programme supprimé avec succès !");
        } catch (error) {
            toast.error("Erreur lors de la suppression du programme");
        }
    };

    return (
        <Layout title={`Programmes de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <EventInfo eventSelected={eventSelected} actualPage="programs"/>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<Plus />}
                onClick={() => handleOpenModal()}
                sx={{ mb: 2 }}
            >
                Ajouter un programme
            </Button>
            
            <Box sx={{
                maxWidth: 600,
                margin: "auto",
                p: 3,
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <ProgramsList 
                    programs={programs} 
                    onEditProgram={handleOpenModal}
                    onDeleteProgram={handleDeleteProgram}
                />

                <ProgramModal 
                    open={modalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitProgram}
                    currentProgram={currentProgram}
                    isSubmitting={isSubmitting}
                />
            </Box>
        </Layout>
    );
};

export default EventPrograms;