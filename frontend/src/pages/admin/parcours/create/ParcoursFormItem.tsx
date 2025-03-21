// components/parcours/ParcoursFormItem.tsx
import React from "react";
import { TextField, Box, IconButton } from "@mui/material";
import { Trash2 } from "lucide-react";
import { IParcours } from "../../../../interfaces";

interface ParcoursFormItemProps {
    parcours: IParcours;
    index: number;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    handleRemove: (index: number) => void;
    touched: any;
    errors: any;
}

const ParcoursFormItem: React.FC<ParcoursFormItemProps> = ({
    parcours,
    index,
    handleChange,
    handleBlur,
    handleRemove,
    touched,
    errors,
}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            border="1px solid #e5e7eb"
            borderRadius="8px"
            padding={2}
            position="relative"
            sx={{ backgroundColor: "#f9f9f9" }}
        >
            <TextField
                size="small"
                fullWidth
                id={`parcours.${index}.nom`}
                name={`parcours.${index}.nom`}
                label="Nom du parcours"
                value={parcours.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched?.parcours?.[index]?.nom && !!errors?.parcours?.[index]?.nom}
                helperText={touched?.parcours?.[index]?.nom && errors?.parcours?.[index]?.nom}
            />

            <TextField
                size="small"
                fullWidth
                id={`parcours.${index}.description`}
                name={`parcours.${index}.description`}
                label="Description du parcours"
                multiline
                rows={2}
                value={parcours.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched?.parcours?.[index]?.description && !!errors?.parcours?.[index]?.description}
                helperText={touched?.parcours?.[index]?.description && errors?.parcours?.[index]?.description}
            />

            <IconButton
                onClick={() => handleRemove(index)}
                size="small"
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#ef4444",
                }}
            >
                <Trash2 size={16} />
            </IconButton>
        </Box>
    );
};

export default ParcoursFormItem;