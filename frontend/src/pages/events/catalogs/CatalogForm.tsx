import { Save, X } from "lucide-react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICatalog, IEvent } from "../../../interfaces";
import { useEffect } from "react";
import apiClient from "../../../apiClient";
import { toast } from "react-toastify";

interface ICatalogFormProps {
    modalOpen: boolean;
    handleCloseModal: () => void;
    catalog: ICatalog | null;
    eventSelected: IEvent | undefined;
    setCatalog: (catalog: ICatalog) => void;
}

const CatalogForm: React.FC<ICatalogFormProps> = ({modalOpen, handleCloseModal, catalog, eventSelected, setCatalog}) => {
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
            id_event: eventSelected?.id_event,
            nom_catalogue: catalog?.nom_catalogue || "",
            description: catalog?.description || "",
        });
    }, [catalog, eventSelected]);

    return (
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
    )
}

export default CatalogForm;