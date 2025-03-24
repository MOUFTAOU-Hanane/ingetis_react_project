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

    const fetchData = async () => {
        try {
            const events = await eventService.fetchEvents();
            const eventId = parseInt(id || "0", 10);
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

    const handleSubmitPrograms = async (programsToSubmit: Partial<IProgram>[]) => {
        try {
            setIsSubmitting(true);
            const eventId = parseInt(id || "0", 10);

            if (currentProgram) {
                // Update existing program
                const updatedProgram = await eventService.updateProgram(
                currentProgram.id_program, 
                { ...programsToSubmit[0], id_event: eventId }
                );
                
                const updatedPrograms = programs.map((program) =>
                program.id_program === currentProgram.id_program
                    ? updatedProgram
                    : program
                );
                
                setPrograms(updatedPrograms);
                toast.success("Programme modifié avec succès !");
            } else {
                // Create new programs
                const newPrograms = await Promise.all(
                programsToSubmit.map(p => 
                    eventService.createProgram({ 
                    ...p, 
                    id_event: eventId 
                    })
                )
                );
                
                setPrograms([...programs, ...newPrograms]);
                toast.success("Programmes ajoutés avec succès !");
            }
            
            handleCloseModal();
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'enregistrement des programmes");
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
                Ajouter des programmes
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
                    onSubmit={handleSubmitPrograms}
                    currentProgram={currentProgram}
                    isSubmitting={isSubmitting}
                />
            </Box>
        </Layout>
    );
};

export default EventPrograms;