// components/parcours/ParcoursForm.tsx
import React from "react";
import { Button, Box } from "@mui/material";
import { Plus, Save } from "lucide-react";
import { FormikProps } from "formik";
import ParcoursFormItem from "./ParcoursFormItem";
import { IParcours } from "../../../../interfaces";

interface FormValues {
    parcours: IParcours[];
}

interface ParcoursFormProps {
    formik: FormikProps<FormValues>;
    handleAddParcours: () => void;
    handleRemoveParcours: (index: number) => void;
}

const ParcoursForm: React.FC<ParcoursFormProps> = ({
    formik,
    handleAddParcours,
    handleRemoveParcours,
}) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
                {formik.values.parcours.map((parcours, index) => (
                    <ParcoursFormItem
                        key={index}
                        parcours={parcours}
                        index={index}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleRemove={handleRemoveParcours}
                        touched={formik.touched}
                        errors={formik.errors}
                    />
                ))}

                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    startIcon={<Plus size={16} />}
                    onClick={handleAddParcours}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        borderColor: "#4f46e5",
                        color: "#4f46e5",
                        ":hover": {
                        backgroundColor: "#ede9fe",
                        borderColor: "#4f46e5",
                        },
                    }}
                >
                    Ajouter un parcours
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Save size={16} />}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        backgroundColor: "#4f46e5",
                        ":hover": { backgroundColor: "#4338ca" },
                    }}
                >
                    Sauvegarder tous les parcours
                </Button>
            </Box>
        </form>
    );
};

export default ParcoursForm;