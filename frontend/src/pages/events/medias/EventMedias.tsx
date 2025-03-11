import React, { useState, useEffect } from "react";
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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Divider,
    Chip,
} from "@mui/material";
import { Plus, Trash2, Save, X, AlertTriangle, ExternalLink, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../../../components/Layout";
import { IEvent } from "../../../interfaces";
import { IMedia } from "../../../interfaces";
import apiClient from "../../../apiClient";

const EventMedias: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [medias, setMedias] = useState<IMedia[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState<IEvent>();
    const [currentMedia, setCurrentMedia] = useState<IMedia | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                const event = response.data.find((event: IEvent) => event.id_event === parseInt(id || "0"));
                setEventSelected(event);

                if (event) {
                    setMedias(event.medias || []);
                } else {
                    toast.error("Événement non trouvé.");
                }

            } catch (error) {
                toast.error("Erreur lors de la récupération des médias !");
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleOpenModal = (mediaToEdit?: IMedia) => {
        if (mediaToEdit) {
            setCurrentMedia(mediaToEdit);
        } else {
            setCurrentMedia(null);
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentMedia(null);
    };

    const formik = useFormik({
        initialValues: {
            medias: [{ type_media: "image", url_media: "", id_program: "", id_catalog: "" }],
        },
        validationSchema: Yup.object({
            medias: Yup.array().of(
                Yup.object({
                    url_media: Yup.string().url("L'URL n'est pas valide").required("L'URL est requise"),
                    type_media: Yup.string().required("Le type de média est requis"),
                    id_program: Yup.string().required("Le programme est requis"),
                    id_catalog: Yup.string().optional(),
                })
            ),
        }),
        onSubmit: (values) => {
            if (currentMedia) {
                setMedias(medias.map((media) =>
                    media.id_media === currentMedia.id_media
                        ? {
                              ...media,
                              ...values.medias[0],
                              id_program: Number(values.medias[0].id_program),
                              id_catalog: Number(values.medias[0].id_catalog),
                          }
                        : media
                ));
                toast.success("Média modifié avec succès !");
            } else {
                setMedias([
                    ...medias,
                    ...values.medias.map((media) => ({
                        ...media,
                        id_media: Date.now() + Math.random(),
                        id_program: Number(media.id_program), // Conversion ici
                        id_catalog: Number(media.id_catalog), // Conversion ici
                    })),
                ]);
                toast.success("Média ajouté avec succès !");
            }
            handleCloseModal();
        },
        
    });

    const addMediaField = () => {
        formik.setFieldValue("medias", [
            ...formik.values.medias,
            { type_media: "image", url_media: "", id_program: "", id_catalog: "" },
        ]);
    };

    // const removeMediaField = (index: number) => {
    //     const updatedMedias = [...formik.values.medias];
    //     updatedMedias.splice(index, 1);
    //     formik.setFieldValue("medias", updatedMedias);
    // };

    const handleDeleteMedia = (mediaId: number) => {
        setMedias(medias.filter((media) => media.id_media !== mediaId));
    };

    return (
        <Layout title={`Médias de l'évènement : ${eventSelected?.titre ?? ""}`}>
            <div className="mb-4">
                <div className="flex gap-2 mb-4">
                    <div>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.catalogs?.length && <AlertTriangle color="red" size={20} />}
                                    Catalogues
                                    <NavLink to={`/events/${id}/catalogs`} style={{ color: 'inherit', textDecoration: 'none' }}>
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
                            title="Obligatoire"
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
                Ajouter des médias
            </Button>

            <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <List>
                    {medias.length > 0 ? medias.map((media) => {
                        const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(media.url_media);
                        const isVideo = /\.(mp4|webm|ogg)$/i.test(media.url_media);

                        return (
                            <ListItem
                                key={media.id_media}
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" onClick={() => handleOpenModal(media)}>
                                            <Edit size={20} color="blue" />
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleDeleteMedia(media.id_media)}>
                                            <Trash2 size={20} color="red" />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText primary={media.type_media} />
                                {isImage && <img src={media.url_media} alt="Media" className="w-20 h-20 object-cover rounded-md" />}
                                {isVideo && (
                                    <video controls className="w-20 h-20 rounded-md">
                                        <source src={media.url_media} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                )}
                            </ListItem>
                        );
                    }) : (
                        <div className="flex gap-2 items-center justify-center">
                            <AlertTriangle color="red" size={20} />
                            <span className="text-red-500">Veuillez ajouter des médias pour valider votre évènement</span>
                        </div>
                    )}
                </List>


                {/* Modal */}
                <Dialog open={modalOpen} onClose={handleCloseModal} sx={{ backdropFilter: "blur(5px)" }}>
                    <DialogTitle>{currentMedia ? "Modifier le média" : "Ajouter des médias"}</DialogTitle>
                    <DialogContent>
                        {formik.values.medias.map((media, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Type de média</InputLabel>
                                    <Select
                                        value={media.type_media}
                                        onChange={(e) => {
                                            const newMedias = [...formik.values.medias];
                                            newMedias[index].type_media = e.target.value;
                                            formik.setFieldValue("medias", newMedias);
                                        }}
                                    >
                                        <MenuItem value="image">Image</MenuItem>
                                        <MenuItem value="video">Vidéo</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="URL du média"
                                    value={media.url_media}
                                    onChange={(e) => {
                                        const newMedias = [...formik.values.medias];
                                        newMedias[index].url_media = e.target.value;
                                        formik.setFieldValue("medias", newMedias);
                                    }}
                                    error={formik.touched.medias?.[index]?.url_media && Boolean(formik.errors.medias?.[index]?.url_media)}
                                    helperText={formik.touched.medias?.[index]?.url_media && formik.errors.medias?.[index]?.url_media}
                                    sx={{ mb: 2 }}
                                />

                                {index < formik.values.medias.length - 1 && <Divider sx={{ my: 2 }} />}
                            </Box>
                        ))}
                        
                        {!currentMedia && <Button variant="outlined" onClick={addMediaField} startIcon={<Plus />}>Ajouter un autre média</Button>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} startIcon={<X />}>Annuler</Button>
                        <Button onClick={formik.handleSubmit} startIcon={<Save />}>Sauvegarder</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default EventMedias;
