import React from "react";
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";

interface FormFieldProps extends Omit<TextFieldProps, 'error'> {
    name: string;
    label: string;
    value: string;
    error?: boolean;
    helperText?: string;
    icon?: React.ReactNode;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    value,
    error,
    helperText,
    icon,
    onChange,
    ...props
}) => {
    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            InputProps={{
                startAdornment: icon ? (
                <InputAdornment position="start">
                    {icon}
                </InputAdornment>
                ) : undefined,
            }}
            {...props}
        />
    );
};

export default FormField;