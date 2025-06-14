import React, { useMemo } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Box, 
    Divider 
} from "@mui/material";
import { Plus, X, Save } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IProgram } from '../../../interfaces';

interface ProgramModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (programs: Partial<IProgram>[]) => void;
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
            programs: Yup.array()
            .of(
                Yup.object({
                    titre: Yup.string().required("Le titre est requis"),
                    description: Yup.string(),
                    date_heure: Yup.string().required("La date et l'heure sont requis"),
                })
            )
            .min(1, "Il doit y avoir au moins un programme"),
        }), []
    );

    const initialValues = useMemo(() => ({
        programs: [{
            titre: currentProgram?.titre || "",
            description: currentProgram?.description || "",
            date_heure: currentProgram?.date_heure 
                ? new Date(currentProgram.date_heure).toISOString().slice(0, 16) 
                : new Date().toISOString().slice(0, 16),
        }],
    }), [currentProgram]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => onSubmit(values.programs),
    });

    const addNewProgramField = () => {
        formik.setFieldValue("programs", [
            ...formik.values.programs,
            { 
                titre: "", 
                description: "", 
                date_heure: new Date().toISOString().slice(0, 16) 
            }
        ]);
    };

    const getFieldError = (index: number, fieldName: keyof IProgram): string | undefined => {
        const touched = formik.touched.programs?.[index];
        const programErrors = formik.errors.programs as any;
        
        return touched && 
               programErrors?.[index]?.[fieldName] as string | undefined;
    };

    const hasFieldError = (index: number, fieldName: keyof IProgram): boolean => {
        return Boolean(getFieldError(index, fieldName));
    };

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
                {currentProgram ? "Modifier le programme" : "Ajouter des programmes"}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit}>
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