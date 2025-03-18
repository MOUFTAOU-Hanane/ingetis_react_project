import React, { useEffect, useMemo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Chip,
    Divider,
} from "@mui/material";
import { Plus, Edit, Trash2, Save, X, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../../components/Layout";
import { IEvent, IProgram } from "../../../interfaces";
import apiClient from "../../../apiClient";

interface IFormValues {
    programs: IProgram[];
}


const EventPrograms: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent | null>(null);
    const [currentProgram, setCurrentProgram] = useState<IProgram | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            const response = await apiClient.get('/events');
            const eventId = parseInt(id || "0", 10);
            const event = response.data.find((event: IEvent) => event.id_event === eventId);
            
            if (event) {
                setEventSelected(event);
                setPrograms(event.programs || []);
            } else {
                toast.error("Événement non trouvé.");
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des programmes !");
            console.error(error);
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
        formik.resetForm();
    };

    const validationSchema = Yup.object({
        programs: Yup.array()
            .of(
                Yup.object({
                    titre: Yup.string().required("Le titre est requis"),
                    description: Yup.string(),
                    date_heure: Yup.string().required("La date et l'heure sont requis"),
                })
            )
            .min(1, "Il doit y avoir au moins un programme"),
    });

    const initialValues = useMemo(() => {
        return {
            programs: [{
                titre: "",
                description: "",
                date_heure: new Date(),
            }],
        };
    }, []);
    

    const formik = useFormik<IFormValues>({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const eventId = parseInt(id || "0", 10);
                
                if (currentProgram) {
                    const updatedPrograms = programs.map((program) =>
                        program.id_program === currentProgram.id_program
                            ? { ...program, ...values.programs[0] }
                            : program
                    );
                    setPrograms(updatedPrograms);
                    toast.success("Programme modifié avec succès !");
                } else {
                    const newPrograms = values.programs.map(p => ({
                        ...p,
                        id_program: Date.now() + Math.random(),
                        id_event: eventId,
                    }));
                    setPrograms([...programs, ...newPrograms]);
                    toast.success("Programmes ajoutés avec succès !");
                }
                handleCloseModal();
            } catch (error) {
                toast.error("Une erreur est survenue lors de l'enregistrement des programmes");
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (currentProgram && formik.values.programs[0].id_program !== currentProgram.id_program) {
            formik.setValues({
                programs: [{ 
                    ...currentProgram, 
                    date_heure: new Date(currentProgram.date_heure)
                }],
            });
        } else {
            // Assurez-vous que initialValues n'est pas modifié par erreur
            formik.setValues(prevValues => ({ ...prevValues, programs: initialValues.programs }));
        }
    }, [currentProgram, formik, initialValues]);
    

    const addNewProgramField = () => {
        formik.setFieldValue("programs", [
            ...formik.values.programs,
            { titre: "", description: "", date_heure: new Date() }
        ]);
    };

    const handleDeleteProgram = async (programId: number) => {
        try {
            setPrograms(programs.filter((program) => program.id_program !== programId));
            toast.success("Programme supprimé avec succès !");
        } catch (error) {
            toast.error("Erreur lors de la suppression du programme");
            console.error(error);
        }
    };

    const formatDateTime = (dateTimeString: Date) => {
        try {
            const date = new Date(dateTimeString);
            return new Intl.DateTimeFormat('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (error) {
            console.error(error);
            return dateTimeString;
        }
    };

    const getFieldError = (index: number, fieldName: keyof IProgram): string | undefined => {
        const touched = formik.touched.programs?.[index]?.[fieldName as keyof IProgram];
        const programError = formik.errors.programs?.[index];

        const errorMessage = programError && typeof programError === 'object' 
            ? programError[fieldName as keyof IProgram]
            : undefined;
        

        return touched && typeof errorMessage === 'string' ? errorMessage : undefined;
    };

    const hasFieldError = (index: number, fieldName: keyof IProgram): boolean => {
        return Boolean(getFieldError(index, fieldName));
    };


    const renderRequirementChip = (
        type: string,
        hasItems: boolean | undefined,
        path: string,
        isRequired: boolean
    ) => (
        <Chip
            label={
                <span className="flex gap-1 items-center">
                    {isRequired && !hasItems && <AlertTriangle color="red" size={20} />}
                    {type}
                    <NavLink to={path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <ExternalLink size={15} />
                    </NavLink>
                </span>
            }
            sx={{
                backgroundColor: '#FFB300',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: 'medium',
                '&:hover': {
                    backgroundColor: '#FF8F00',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                }
            }}
            title={isRequired ? "Obligatoire" : "Facultatif"}
        />
    );

    return (
        <Layout title={`Programmes de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <div className="mb-4">
                <div className="flex gap-2 mb-4">
                    <div>
                        {renderRequirementChip(
                            "Médias",
                            eventSelected?.medias?.length ? eventSelected?.medias?.length > 0 : false,
                            `/events/${id}/medias`,
                            true
                        )}
                    </div>
                    <div>
                        {renderRequirementChip(
                            "Catalogues",
                            eventSelected?.catalogs?.length ? eventSelected?.catalogs?.length > 0 : false,
                            `/events/${id}/catalogs`,
                            false
                        )}
                    </div>
                </div>
                <div>
                    <span className="text-xs flex text-red-800">
                        <AlertTriangle color="red" size={15} /> : Ce n'est pas encore complet
                    </span>
                </div>
            </div>

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
                <List>
                    {programs?.length > 0 ? (
                        programs.map((program) => (
                            <ListItem
                                key={program.id_program}
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" onClick={() => handleOpenModal(program)}>
                                            <Edit size={20} color="blue" />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => program.id_program && handleDeleteProgram(program.id_program)}
                                        >
                                            <Trash2 size={20} color="red" />
                                        </IconButton>
                                    </>
                                }
                                sx={{ borderBottom: "1px solid #eee" }}
                            >
                                <ListItemText
                                    primary={program.titre}
                                    secondary={formatDateTime(program.date_heure).toString()}
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <div className="flex gap-2 items-center justify-center p-4">
                            <AlertTriangle color="red" size={20} />
                            <span className="text-red-500">
                                Veuillez ajouter les programmes afin de valider votre évènement
                            </span>
                        </div>
                    )}
                </List>

                {/* Modal for adding/editing programs */}
                <Dialog
                    open={modalOpen}
                    onClose={handleCloseModal}
                    fullWidth
                    maxWidth="sm"
                    sx={{ backdropFilter: "blur(5px)" }}
                >
                    <DialogTitle>
                        {currentProgram ? "Modifier le programme" : "Ajouter des programmes"}
                    </DialogTitle>
                    <DialogContent dividers>
                        <form onSubmit={formik.handleSubmit}>
                            {formik.values.programs.map((program, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Titre"
                                        name={`programs[${index}].titre`}
                                        value={program.titre || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={hasFieldError(index, 'titre')}
                                        helperText={getFieldError(index, 'titre')}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name={`programs[${index}].description`}
                                        multiline
                                        rows={3}
                                        value={program.description || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label="Date et heure"
                                        name={`programs[${index}].date_heure`}
                                        value={program.date_heure || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={hasFieldError(index, 'date_heure')}
                                        helperText={getFieldError(index, 'date_heure')}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 1 }}
                                    />

                                    {index < formik.values.programs.length - 1 && (
                                        <Divider sx={{ my: 2 }} />
                                    )}
                                </Box>
                            ))}
                        </form>
                        {!currentProgram && (
                            <Button
                                variant="outlined"
                                onClick={addNewProgramField}
                                startIcon={<Plus />}
                                sx={{ mt: 1 }}
                            >
                                Ajouter un autre programme
                            </Button>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} startIcon={<X />}>
                            Annuler
                        </Button>
                        <Button
                            onClick={() => formik.handleSubmit()}
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            disabled={isSubmitting || !formik.dirty || !formik.isValid}
                        >
                            Sauvegarder
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default EventPrograms;