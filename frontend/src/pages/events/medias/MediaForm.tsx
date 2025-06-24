import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Divider,
} from "@mui/material";
import { Minus, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IMedia } from "../../../interfaces";

interface IMediaFormProps {
    modalOpen: boolean;
    handleCloseModal: () => void;
    currentMedia: IMedia | null;
    medias: IMedia[];
    setMedias: (medias: IMedia[]) => void;
}

const MediaForm: React.FC<IMediaFormProps> = ({modalOpen, handleCloseModal, currentMedia, medias, setMedias}) => {
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

    const removeMediaField = (index: number) => {
        const updatedMedias = [...formik.values.medias];
        updatedMedias.splice(index, 1);
        formik.setFieldValue("medias", updatedMedias);
    };

    return (
        <Dialog open={modalOpen} onClose={handleCloseModal} sx={{ backdropFilter: "blur(5px)" }}>
            <DialogTitle>{currentMedia ? "Modifier le média" : "Ajouter des médias"}</DialogTitle>
            <DialogContent>
                {formik.values.medias.map((media, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        {formik.values.medias.length > 1 && 
                            <div className="pt-2 pb-2 flex justify-end">
                                <Trash2 color="red" size={16} className="cursor-pointer" onClick={() => removeMediaField(index)} /> 
                            </div>
                        }
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
    )
}

export default MediaForm;