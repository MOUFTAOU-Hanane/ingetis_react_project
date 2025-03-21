import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps {
    onClick: () => void;
    label: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg flex items-center gap-2 cursor-pointer"
        >
            <Plus size={16} /> {label}
        </button>
    );
};

export default AddButton;