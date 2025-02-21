import React, { useEffect, useState } from "react";
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
    Typography,
    Chip,
    Divider,
} from "@mui/material";
import { Plus, Edit, Trash2, Save, X, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import events from "../../../data/events.json";
import Layout from "../../../components/Layout";
import { Event } from "../../../interfaces";
import { Program } from "../../../interfaces";

const EventPrograms: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [programs, setPrograms] = useState<Program[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<Event>();
    const [currentProgram, setCurrentProgram] = useState<Program | null>(null); // State for the program to be edited

    useEffect(() => {
        const event = events.find((event) => event.id_event === parseInt(id || "0"));
        setEventSelected(event);
        if (event) {
            setPrograms(event.programs || []);
        } else {
            toast.error("Événement non trouvé.");
        }
    }, [id]);

    const handleOpenModal = async (programToEdit?: Program) => {
        if (programToEdit) {
            await setCurrentProgram(programToEdit); // Set current program to edit
        } else {
            setCurrentProgram(null); // For adding new programs
        }
        setModalOpen(true);
    };

    

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentProgram(null); // Reset current program when modal closes
    };

    const formik = useFormik({
        initialValues: {
            programs: currentProgram ? [{ ...currentProgram }] : [{ titre: "", description: "", date_heure: new Date().toISOString().slice(0, 16) }],
        },
        validationSchema: Yup.object({
            programs: Yup.array()
                .of(
                    Yup.object({
                        titre: Yup.string().required("Le titre est requis"),
                        description: Yup.string(),
                        date_heure: Yup.string().required("La date et l'heure sont requis"),
                    })
                )
                .min(1, "Il doit y avoir au moins un programme"),
        }),
        onSubmit: (values) => {
            if (currentProgram) {
                // Modify existing program
                setPrograms(programs.map((program) =>
                    program.id_program === currentProgram.id_program
                        ? { ...program, ...values.programs[0] }
                        : program
                ));
                toast.success("Programme modifié avec succès !");
            } else {
                // Add new programs
                setPrograms([...programs, ...values.programs.map(p => ({ ...p, id_program: Date.now() + Math.random() }))]);
                toast.success("Programmes ajoutés avec succès !");
            }
            handleCloseModal();
        },
    });

    useEffect(() => {
        if (currentProgram) {
            // Lorsque currentProgram change, mettre à jour les valeurs de formik avec les données de currentProgram
            formik.setValues({
                programs: [{ ...currentProgram }],
            });
        } else {
            // Si aucun programme n'est sélectionné (nouveau programme), initialiser les valeurs par défaut
            formik.setValues({
                programs: [{ titre: "", description: "", date_heure: new Date().toISOString().slice(0, 16) }],
            });
        }
    }, [currentProgram]);
    

    const addNewProgramField = () => {
        formik.setFieldValue("programs", [...formik.values.programs, { titre: "", description: "", date_heure: new Date().toISOString().slice(0, 16) }]);
    };

    const handleDeleteProgram = (programId: number) => {
        setPrograms(programs.filter((program) => program.id_program !== programId));
    };

    return (
        <Layout title="Programmes de l'évènement">
            <div className="mb-4">
                <div className="flex gap-2 mb-4">
                    <div>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.medias?.length && <AlertTriangle color="red" size={20} />} 
                                    Médias <ExternalLink size={15}/>
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
                            title="Obligatoire"
                        />
                    </div>
                    <div>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.catalogs?.length && <AlertTriangle color="red" size={20} />} 
                                    Catalogues <ExternalLink size={15}/>
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
                            title="Facultatif"
                        />
                    </div>
                </div>
                <div>
                    <span className="text-xs flex text-red-800">
                        <AlertTriangle color="red" size={15} /> : Ce n'est pas encore complet
                    </span>
                </div>
            </div>

            <Button variant="contained" color="secondary" startIcon={<Plus />} onClick={() => handleOpenModal()}>
                Ajouter des programmes
            </Button>
            <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <List>
                    {programs?.length > 0 ? 
                        programs.map((program) => (
                            <ListItem key={program.id_program} secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleOpenModal(program)}>
                                        <Edit size={20} color="blue" />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => program.id_program && handleDeleteProgram(program.id_program)}>
                                        <Trash2 size={20} color="red" />
                                    </IconButton>

                                </>
                            }>
                                <ListItemText primary={program.titre} secondary={program.date_heure} />
                            </ListItem>
                        )) : 
                        <div className="flex gap-2 items-center justify-center">
                            <AlertTriangle color="red" size={20}/>
                            <span className="text-red-500">Veuillez ajouter les programmes afin de valider votre évènement</span>
                        </div>
                    }
                </List>
                
                {/* Modal */}
                <Dialog open={modalOpen} onClose={handleCloseModal} sx={{ backdropFilter: "blur(5px)" }}>
                    <DialogTitle>{currentProgram ? "Modifier le programme" : "Ajouter des programmes"}</DialogTitle>
                    <DialogContent>
                        {formik.values.programs.map((program, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Titre"
                                    value={program.titre}
                                    onChange={(e) => formik.setFieldValue(`programs[${index}].titre`, e.target.value)}
                                    error={formik.touched.programs && formik.touched.programs[index]?.titre && Boolean(formik.errors.programs?.[index]?.titre)}
                                    helperText={formik.touched.programs && formik.touched.programs[index]?.titre && formik.errors.programs?.[index]?.titre}
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={3}
                                    value={program.description}
                                    onChange={(e) => formik.setFieldValue(`programs[${index}].description`, e.target.value)}
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    label="Date et heure"
                                    value={program.date_heure}
                                    onChange={(e) => formik.setFieldValue(`programs[${index}].date_heure`, e.target.value)}
                                    error={formik.touched.programs && formik.touched.programs[index]?.date_heure && Boolean(formik.errors.programs?.[index]?.date_heure)}
                                    helperText={formik.touched.programs && formik.touched.programs[index]?.date_heure && formik.errors.programs?.[index]?.date_heure}
                                    sx={{ mb: 1 }}
                                />
                                {index < formik.values.programs.length - 1 && <Divider sx={{ my: 2 }} />}
                            </Box>
                        ))}
                        {!currentProgram && <Button variant="outlined" onClick={addNewProgramField} startIcon={<Plus />}>Ajouter un autre programme</Button>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} startIcon={<X />}>Annuler</Button>
                        <Button onClick={formik.handleSubmit} variant="contained" startIcon={<Save />}>Sauvegarder</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default EventPrograms;
