import React, { useMemo } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Box
} from "@mui/material";
import { X, Save } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IProgram } from '../../../interfaces';

interface ProgramModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (program: Partial<IProgram>) => void;
    currentProgram?: IProgram | null;
    isSubmitting: boolean;
}

const ProgramModal: React.FC<ProgramModalProps> = ({ 
    open, 
    onClose, 
    onSubmit, 
    currentProgram, 
    isSubmitting 
}) => {
    const validationSchema = useMemo(() => 
        Yup.object({
            titre: Yup.string().required("Le titre est requis"),
            description: Yup.string(),
            date_heure: Yup.string().required("La date et l'heure sont requis"),
        }), []
    );

    const initialValues = useMemo(() => ({
        titre: currentProgram?.titre || "",
        description: currentProgram?.description || "",
        date_heure: currentProgram?.date_heure 
            ? new Date(currentProgram.date_heure).toISOString().slice(0, 16) 
            : new Date().toISOString().slice(0, 16),
    }), [currentProgram]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => onSubmit(values),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formik.handleSubmit();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{ backdropFilter: "blur(5px)" }}
        >
            <DialogTitle>
                {currentProgram ? "Modifier le programme" : "Ajouter un programme"}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Titre"
                            name="titre"
                            value={formik.values.titre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.titre && Boolean(formik.errors.titre)}
                            helperText={formik.touched.titre && formik.errors.titre}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="datetime-local"
                            label="Date et heure"
                            name="date_heure"
                            value={formik.values.date_heure}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date_heure && Boolean(formik.errors.date_heure)}
                            helperText={formik.touched.date_heure && formik.errors.date_heure}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<X />}>
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
    );
};

export default ProgramModal;