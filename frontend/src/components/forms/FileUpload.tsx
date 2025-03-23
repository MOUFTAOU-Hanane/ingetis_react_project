import React from "react";
import { Typography } from "@mui/material";
import { FormikTouched } from "formik";

interface FileUploadProps {
  name: string;
  onChange: (file: File | null) => void;
  error?: string;
  touched?: boolean | FormikTouched<any>;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  onChange,
  error,
  touched,
  accept = "image/*"
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <div>
      <div className="bg-gray-500 p-2 text-white rounded-lg w-1/2 text-sm">
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
        />
      </div>
      {touched && error && (
        <Typography color="error" variant="body2">{error}</Typography>
      )}
    </div>
  );
};

export default FileUpload;