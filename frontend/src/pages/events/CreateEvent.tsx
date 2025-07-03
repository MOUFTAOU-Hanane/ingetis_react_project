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
import { IEvent, ILieu } from "../../interfaces";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object({
    titre: Yup.string().required("Le titre est requis").max(100, "Maximum 100 caractères"),
    description: Yup.string().max(500, "Maximum 500 caractères"),
    places_initial: Yup.number()
        .required("Le nombre de places initiales est requis")
        .positive("Le nombre de places doit être un nombre positif"),
    places_disponible: Yup.number()
        .required("Le nombre de places disponibles est requis")
        .min(0, "Le nombre de places disponibles ne peut pas être négatif")
        .max(Yup.ref("places_initial"), "Ne peut pas dépasser le nombre de places initiales"),
    date_debut: Yup.date().required("La date de début est requise"),
    date_fin: Yup.date().required("La date de fin est requise"),
    id_lieu: Yup.number().required("Le lieu est requis").positive("Le lieu doit être un nombre valide"),
});

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [warningModal, setWarningModal] = useState<boolean>(false);
    const [lieuxData, setLieuxData] = useState<ILieu[]>([]);
    const [oneEvent, setOneEvent] = useState<IEvent | null>(null);

    const fetchLieux = async () => {
        try {
            const response = await apiClient.get("/lieu");
            setLieuxData(response.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des lieux.");
            console.log({ error });
        }
    };

    const fetchEvent = async () => {
        if (id) {
            try {
                const response = await apiClient.get(`/events/${id}`);
                setOneEvent(response.data.event);
            } catch (error) {
                toast.error("Erreur lors du chargement de l'événement.");
                console.log({ error });
            }
        }
    };

    useEffect(() => {
        fetchLieux();
        if (id) {
            fetchEvent();
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            titre: "",
            description: "",
            date_debut: "",
            date_fin: "",
            id_lieu: "",
            places_initial: "",
            places_disponible: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const lieu = lieuxData.find((place) => place.id_lieu === Number(values.id_lieu));
                if (!lieu) {
                    toast.error("Le lieu sélectionné n'existe pas.");
                    return;
                }

                const newEventData = {
                    ...values,
                    id_createur: user?.id_user,
                    id_event: id ? parseInt(id) : undefined,
                    lieu: id ? { id_lieu: Number(values.id_lieu) } : Number(values.id_lieu),
                    programs: oneEvent?.programs || [],
                    medias: oneEvent?.medias || [],
                    catalogs: oneEvent?.catalogs || [],
                    places_initial: Number(values.places_initial),
                    places_disponible: Number(values.places_disponible),
                };

                if (!id) {
                    const response = await apiClient.post("/events", newEventData);
                    setOneEvent(response.data.event);
                    toast.success("Événement créé avec succès !");
                } else {
                    const response = await apiClient.put(`/events/${id}`, newEventData);
                    setOneEvent(response.data.event);
                    toast.success("Événement modifié avec succès !");
                    navigate('/events');
                }

                setOpenModal(true);
            } catch (error) {
                toast.error("Erreur lors de la création ou modification de l'événement");
                console.log({ error });
            }
        },
    });

    useEffect(() => {
        if (oneEvent) {
            formik.setValues({
                titre: oneEvent.titre || "",
                description: oneEvent.description || "",
                date_debut: oneEvent.date_debut ? oneEvent.date_debut.split("T")[0] : "",
                date_fin: oneEvent.date_fin ? oneEvent.date_fin.split("T")[0] : "",
                id_lieu: oneEvent.lieu?.id_lieu?.toString() || "",
                places_initial: oneEvent.places_initial?.toString() || "",
                places_disponible: oneEvent.places_disponible?.toString() || "",
            });
        }
    }, [oneEvent]);

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
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Places initiales"
                            type="number"
                            {...formik.getFieldProps("places_initial")}
                            error={formik.touched.places_initial && Boolean(formik.errors.places_initial)}
                            helperText={formik.touched.places_initial && formik.errors.places_initial}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Places disponibles"
                            type="number"
                            {...formik.getFieldProps("places_disponible")}
                            error={formik.touched.places_disponible && Boolean(formik.errors.places_disponible)}
                            helperText={formik.touched.places_disponible && formik.errors.places_disponible}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Date de début"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            {...formik.getFieldProps("date_debut")}
                            error={formik.touched.date_debut && Boolean(formik.errors.date_debut)}
                            helperText={formik.touched.date_debut && formik.errors.date_debut}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Date de fin"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            {...formik.getFieldProps("date_fin")}
                            error={formik.touched.date_fin && Boolean(formik.errors.date_fin)}
                            helperText={formik.touched.date_fin && formik.errors.date_fin}
                        />

                        <FormControl fullWidth size="small" error={formik.touched.id_lieu && Boolean(formik.errors.id_lieu)}>
                            <InputLabel>Lieu</InputLabel>
                            <Select
                                label="Lieu"
                                {...formik.getFieldProps("id_lieu")}
                            >
                                {lieuxData.map((place) => (
                                    <MenuItem key={place.id_lieu} value={place.id_lieu}>
                                        {place.nom}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.id_lieu && formik.errors.id_lieu && (
                                <div style={{ color: "red", fontSize: "0.75rem" }}>
                                    {formik.errors.id_lieu}
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

            {!id &&
                <>
                    <Dialog open={openModal} onClose={() => setOpenModal(false)} disableEscapeKeyDown>
                        <DialogTitle>Événement créé avec succès !</DialogTitle>
                        <DialogContent>
                            <div className="flex flex-col gap-4">
                                <a href={`/events/${oneEvent?.id_event}/programs`} className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                                    Ajouter les programmes <span className="text-sm text-red-500">(obligatoire)</span>
                                </a>
                                <a href={`/events/${oneEvent?.id_event}/medias`} className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                                    Ajouter les médias <span className="text-sm text-red-500">(obligatoire)</span>
                                </a>
                                <a href={`/events/${oneEvent?.id_event}/catalogs`} className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                                    Ajouter les catalogues <span className="text-sm text-amber-500">(facultatif)</span>
                                </a>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setOpenModal(false); setWarningModal(true); }}>
                                Plus tard
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => { setOpenModal(false); navigate("/events"); }}>
                                Annuler
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={warningModal} onClose={() => setWarningModal(false)} disableEscapeKeyDown>
                        <DialogContent className="flex gap-4 items-center">
                            <AlertTriangle size={24} color="red" />
                            <span className="text-red-500">Votre événement ne sera pas visible si vous vous arrêtez là.</span>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => navigate("/events")}>
                                D'accord
                            </Button>
                            <Button variant="contained" onClick={() => { setWarningModal(false); setOpenModal(true); }}>
                                Revenir en arrière
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </Layout>
    );
};

export default CreateEvent;
