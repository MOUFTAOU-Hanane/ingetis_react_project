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
    Chip,
    Divider,
} from "@mui/material";
import { Plus, Edit, Trash2, Save, X, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../../components/Layout";
import { ICatalog, IEvent } from "../../../interfaces";
import apiClient from "../../../apiClient";

const EventCatalogs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [catalog, setCatalog] = useState<ICatalog | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const event = response.data.find((event: IEvent) => event.id_event === parseInt(id || "0"));
                setEventSelected(event);

                if (event) {
                    setCatalog(event.catalogs?.[0] || null);
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

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeleteCatalog = async () => {
        try {
            await apiClient.delete(`/catalogs/${catalog?.id_catalog}`);

            setCatalog(null);
            toast.success("Catalogue supprimé avec succès !");
        } catch (error) {
            console.log({error})
            toast.error("Erreur lors de la suppression");
        }
    };

    const formik = useFormik({
        initialValues: {
            id_catalog: catalog ? catalog?.id_catalog : "",
            id_event: eventSelected?.id_event,
            nom_catalogue: catalog ? catalog.nom_catalogue : "",
            description: catalog ? catalog.description : "",
        },
        validationSchema: Yup.object({
            nom_catalogue: Yup.string().required("Le nom du catalogue est requis"),
            description: Yup.string(),
        }),
        onSubmit: async (values) => {
            if(values?.id_catalog) {
                await apiClient.put(`/catalogs/${values?.id_catalog}`, values);
            } else {
                await apiClient.post('/catalogs', values);
            }

            setCatalog({ ...values, id_catalog: catalog?.id_catalog || Date.now(), id_event: eventSelected?.id_event ?? 0 });
            toast.success(catalog ? "Catalogue modifié avec succès !" : "Catalogue ajouté avec succès !");
            handleCloseModal();
        },
    });

    useEffect(() => {
        formik.setValues({
            id_catalog: catalog?.id_catalog || "",
            id_event: eventSelected?.id_event || undefined,
            nom_catalogue: catalog?.nom_catalogue || "",
            description: catalog?.description || "",
        });
    }, [catalog, eventSelected]);
    

    return (
        <Layout title={`Catalogue de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <Button variant="contained" color="secondary" startIcon={<Plus />} onClick={handleOpenModal}>
                {catalog ? "Modifier le catalogue" : "Ajouter un catalogue"}
            </Button>
            {catalog && (
                <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <List>
                        <ListItem secondaryAction={
                            <>
                                <IconButton edge="end" onClick={handleOpenModal}>
                                    <Edit size={20} color="blue" />
                                </IconButton>
                                <IconButton edge="end" onClick={handleDeleteCatalog}>
                                    <Trash2 size={20} color="red" />
                                </IconButton>
                            </>
                        }>
                            <ListItemText primary={catalog.nom_catalogue} secondary={catalog.description} />
                        </ListItem>
                    </List>
                </Box>
            )}

            {/* Modal */}
            <Dialog open={modalOpen} onClose={handleCloseModal} sx={{ backdropFilter: "blur(5px)" }}>
                <DialogTitle>{catalog ? "Modifier le catalogue" : "Ajouter un catalogue"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nom du catalogue"
                        value={formik.values.nom_catalogue}
                        onChange={formik.handleChange}
                        name="nom_catalogue"
                        error={formik.touched.nom_catalogue && Boolean(formik.errors.nom_catalogue)}
                        helperText={formik.touched.nom_catalogue && formik.errors.nom_catalogue}
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                        sx={{ mb: 1 }}
                    />
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
        </Layout>
    );
};


export default EventCatalogs;
