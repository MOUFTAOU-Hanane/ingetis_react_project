import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Save, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../apiClient";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import events from "../../data/events.json";
import { Event, Lieu } from "../../interfaces";


const validationSchema = Yup.object({
    titre: Yup.string().required("Le titre est requis").max(100, "Maximum 100 caractères"),
    description: Yup.string().max(500, "Maximum 500 caractères"),
    date_debut: Yup.date().required("La date de début est requise"),
    date_fin: Yup.date().required("La date de fin est requise"),
    lieu: Yup.number().required("Le lieu est requis").positive("Le lieu doit être un nombre valide"),
});

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [warningModal, setWarningModal] = useState<boolean>(false);
    const [lieuxData, setLieuxData] = useState<Lieu[]>([]);
    const [eventsData, setEventsData] = useState<Event[]>(events);
    const [oneEvent, setOneEvent] = useState<Event | undefined>();

    useEffect(() => {
        const fetchLieux = async () => {
            try {
                const response = await apiClient.get<Lieu[]>("admin/lieux");
                setLieuxData(response.data);
            } catch (error) {
                toast.error("Erreur lors du chargement des lieux.");
            }
        };

        fetchLieux();
    }, []);

    useEffect(() => {
        if (id) {
            const eventToEdit = eventsData.find((event) => event.id_event === parseInt(id));
            if (eventToEdit) {
                setOneEvent(eventToEdit);
                formik.setValues({
                    titre: eventToEdit.titre,
                    description: eventToEdit.description,
                    date_debut: eventToEdit.date_debut,
                    date_fin: eventToEdit.date_fin,
                    lieu: eventToEdit.lieu.id_lieu.toString(),
                });
            }
        }
    }, [id, eventsData]);

    const formik = useFormik({
        initialValues: {
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
            lieu: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const lieu = lieuxData.find((place) => place.id_lieu === Number(values.lieu));

                if (!lieu) {
                    toast.error("Le lieu sélectionné n'existe pas.");
                    return;
                }

                const newEventData = {
                    ...values,
                    id_event: id ? parseInt(id) : eventsData.length + 1,
                    lieu: lieu,
                    programs: oneEvent?.programs || [],
                    medias: oneEvent?.medias || [],
                    catalogs: oneEvent?.catalogs || []
                };

                if (!id) {
                    setOneEvent(newEventData as Event);
                    setEventsData((prevEvents) => [...prevEvents, newEventData as Event]);
                    toast.success("Événement créé avec succès !");
                    resetForm();
                } else {
                    const updatedEvent = {
                        ...newEventData,
                        programs: oneEvent?.programs || [],
                        medias: oneEvent?.medias || [],
                        catalogs: oneEvent?.catalogs || []
                    };

                    setOneEvent(updatedEvent as Event);
                    setEventsData((prevEvents) => prevEvents.map(event =>
                        event.id_event === updatedEvent.id_event ? updatedEvent as Event : event
                    ));
                    toast.success("Événement modifié avec succès !");
                }
                
                setOpenModal(true);
            } catch (error) {
                toast.error("Erreur lors de la création ou modification de l'événement");
            }
        },
    });

    return (
        <Layout title={id ? "Modifier un évènement" : "Créer un évènement"}>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: "auto",
                    padding: 3,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "white",
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Titre"
                            {...formik.getFieldProps("titre")}
                            error={formik.touched.titre && Boolean(formik.errors.titre)}
                            helperText={formik.touched.titre && formik.errors.titre}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            {...formik.getFieldProps("description")}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Date de début"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps("date_debut")}
                            error={formik.touched.date_debut && Boolean(formik.errors.date_debut)}
                            helperText={formik.touched.date_debut && formik.errors.date_debut}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Date de fin"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps("date_fin")}
                            error={formik.touched.date_fin && Boolean(formik.errors.date_fin)}
                            helperText={formik.touched.date_fin && formik.errors.date_fin}
                        />

                        <FormControl fullWidth size="small" error={formik.touched.lieu && Boolean(formik.errors.lieu)}>
                            <InputLabel>Lieu</InputLabel>
                            <Select
                                label="Lieu"
                                {...formik.getFieldProps("lieu")}
                            >
                                {lieuxData.map((place) => (
                                    <MenuItem key={place.id_lieu} value={place.id_lieu}>
                                        {place.nom}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.lieu && formik.errors.lieu && (
                                <div style={{ color: "red", fontSize: "0.75rem" }}>
                                    {formik.errors.lieu}
                                </div>
                            )}
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<Save size={16} />}
                        >
                            {id ? "Modifier" : "Sauvegarder"}
                        </Button>
                    </Box>
                </form>
            </Box>

            <Dialog 
                open={openModal} 
                onClose={() => setOpenModal(false)}
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <span>Événement {id ? "modifié" : "créé"} avec succès !</span>
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <a 
                            href={`/events/${oneEvent?.id_event}/programs/create`} 
                            className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                            Ajouter les programmes <span className="text-sm text-red-500">(obligatoire)</span>
                        </a>
                        <a 
                            href={`/events/${oneEvent?.id_event}/medias/create`} 
                            className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                            Ajouter les médias <span className="text-sm text-red-500">(obligatoire)</span>
                        </a>
                        <a 
                            href={`/events/${oneEvent?.id_event}/catalogs/create`} 
                            className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                            Ajouter les catalogss <span className="text-sm text-amber-500">(facultatif)</span>
                        </a>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenModal(false); setWarningModal(true); }}>
                        Plus tard
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => { 
                            setOpenModal(false); 
                            navigate(`/events/update/${oneEvent?.id_event}`); 
                        }}
                    >
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog 
                open={warningModal} 
                onClose={() => setWarningModal(false)}
                disableEscapeKeyDown
            >
                <DialogContent className="flex gap-4 items-center">
                    <AlertTriangle size={15} color="red" style={{ marginRight: 8 }} />
                    <span className="text-red-500">Votre événement ne sera pas visible si vous vous arrêtez là.</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate("/events")}>
                        D'accord
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => { 
                            setWarningModal(false); 
                            setOpenModal(true); 
                        }}
                    >
                        Revenir en arrière
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default CreateEvent;