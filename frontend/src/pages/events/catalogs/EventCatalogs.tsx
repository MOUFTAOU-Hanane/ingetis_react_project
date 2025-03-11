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
import { NavLink, useParams } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import events from "../../../data/events.json";
import Layout from "../../../components/Layout";
import { Catalog, Event } from "../../../interfaces";
import apiClient from "../../../apiClient";

const EventCatalogs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<Event>();
    const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const event = response.data.find((event: Event) => event.id_event === parseInt(id || "0"));
                setEventSelected(event);

                if (event) {
                    setCatalogs(event.catalogs || []);
                } else {
                    toast.error("Événement non trouvé.");
                }

            } catch (error) {
                toast.error("Erreur lors de la récupération des programmes !");
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleOpenModal = async (catalogToEdit?: Catalog) => {
        if (catalogToEdit) {
            await setCurrentCatalog(catalogToEdit);
        } else {
            setCurrentCatalog(null);
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentCatalog(null);
    };

    const formik = useFormik({
        initialValues: {
            catalogs: currentCatalog ? [{ ...currentCatalog }] : [{ nom_catalogue: "", description: "" }],
        },
        validationSchema: Yup.object({
            catalogs: Yup.array()
                .of(
                    Yup.object({
                        nom_catalogue: Yup.string().required("Le nom du catalogue est requis"),
                        description: Yup.string(),
                    })
                )
                .min(1, "Il doit y avoir au moins un catalogue"),
        }),
        onSubmit: (values) => {
            if (currentCatalog) {
                // Mise à jour du catalogue existant avec l'id_event
                setCatalogs(catalogs.map((catalog) =>
                    catalog.id_catalog === currentCatalog.id_catalog
                        ? { ...catalog, ...values.catalogs[0], id_event: eventSelected?.id_event ?? 0 }
                        : catalog
                ));
                toast.success("Catalogue modifié avec succès !");
            } else {
                // Ajout d'un nouveau catalogue avec l'id_event
                setCatalogs([
                    ...catalogs,
                    ...values.catalogs.map(c => ({ ...c, id_catalog: Date.now() + Math.random(), id_event: eventSelected?.id_event ?? 0 }))
                ]);
                toast.success("Catalogue ajouté avec succès !");
            }
            handleCloseModal();
        },
    });
    

    useEffect(() => {
        if (currentCatalog) {
            formik.setValues({
                catalogs: [{ ...currentCatalog }],
            });
        } else {
            formik.setValues({
                catalogs: [{ nom_catalogue: "", description: "" }],
            });
        }
    }, [currentCatalog]);

    const addNewCatalogField = () => {
        formik.setFieldValue("catalogs", [...formik.values.catalogs, { nom_catalogue: "", description: "" }]);
    };

    const handleDeleteCatalog = (catalogId: number) => {
        setCatalogs(catalogs.filter((catalog) => catalog.id_catalog !== catalogId));
    };

    return (
        <Layout title={`Catalogues de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <div className="mb-4">
                <div className="flex gap-2 mb-4">
                    <div>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.medias?.length && <AlertTriangle color="red" size={20} />} 
                                    Médias 
                                    <NavLink to={`/events/${id}/medias`} style={{ color: 'inherit', textDecoration: 'none' }}>
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
                            title="Obligatoire"
                        />
                    </div>
                    <div>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.programs?.length && <AlertTriangle color="red" size={20} />} 
                                    Programmes 
                                    <NavLink to={`/events/${id}/programs`} style={{ color: 'inherit', textDecoration: 'none' }}>
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
                Ajouter des catalogues
            </Button>
            <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <List>
                    {catalogs?.length > 0 ? 
                        catalogs.map((catalog) => (
                            <ListItem key={catalog.id_catalog} secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleOpenModal(catalog)}>
                                        <Edit size={20} color="blue" />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDeleteCatalog(catalog.id_catalog)}>
                                        <Trash2 size={20} color="red" />
                                    </IconButton>
                                </>
                            }>
                                <ListItemText primary={catalog.nom_catalogue} secondary={catalog.description} />
                            </ListItem>
                        )) : 
                        <div className="flex gap-2 items-center justify-center">
                            <AlertTriangle color="red" size={20}/>
                            <span className="text-red-500">Veuillez ajouter des catalogues pour valider votre évènement</span>
                        </div>
                    }
                </List>

                {/* Modal */}
                <Dialog open={modalOpen} onClose={handleCloseModal} sx={{ backdropFilter: "blur(5px)" }}>
                    <DialogTitle>{currentCatalog ? "Modifier le catalogue" : "Ajouter des catalogues"}</DialogTitle>
                    <DialogContent>
                        {formik.values.catalogs.map((catalog, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Nom du catalogue"
                                    value={catalog.nom_catalogue}
                                    onChange={(e) => formik.setFieldValue(`catalogs[${index}].nom_catalogue`, e.target.value)}
                                    error={formik.touched.catalogs?.[index]?.nom_catalogue && Boolean(formik.errors.catalogs?.[index]?.nom_catalogue)}
                                    helperText={
                                        formik.touched.catalogs?.[index]?.nom_catalogue && formik.errors.catalogs?.[index]?.nom_catalogue
                                    }
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={3}
                                    value={catalog.description}
                                    onChange={(e) => formik.setFieldValue(`catalogs[${index}].description`, e.target.value)}
                                    sx={{ mb: 1 }}
                                />
                                {index < formik.values.catalogs.length - 1 && <Divider sx={{ my: 2 }} />}

                                {/* Bouton de suppression du catalogue */}
                                <Button
                                    color="error"
                                    onClick={() => {
                                        const updatedCatalogs = formik.values.catalogs.filter((_, i) => i !== index);
                                        formik.setFieldValue("catalogs", updatedCatalogs);
                                    }}
                                    sx={{ mt: 1 }}
                                >
                                    Supprimer ce catalogue
                                </Button>
                            </Box>
                        ))}
                        {!currentCatalog && <Button variant="outlined" onClick={addNewCatalogField} startIcon={<Plus />}>Ajouter un autre catalogue</Button>}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseModal} startIcon={<X />}>Annuler</Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault(); 
                                formik.handleSubmit();
                            }}
                            variant="contained"
                            startIcon={<Save />}
                            >
                            Sauvegarder
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default EventCatalogs;
