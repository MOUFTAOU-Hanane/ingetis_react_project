import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@mui/material";

interface ConfirmationModalProps {
    // Propriétés de base
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    
    // Personnalisation du contenu
    title: string;
    message: string | React.ReactNode;
    itemToDelete?: string;
    
    // Personnalisation des boutons
    confirmLabel?: string;
    cancelLabel?: string;
    confirmIcon?: LucideIcon;
    cancelIcon?: LucideIcon;
    
    // Personnalisation des styles
    confirmButtonClassName?: string;
    cancelButtonClassName?: string;
    titleClassName?: string;
    messageClassName?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemToDelete,
    confirmLabel = "Confirmer",
    cancelLabel = "Annuler",
    confirmIcon: ConfirmIcon,
    cancelIcon: CancelIcon,
    confirmButtonClassName = "bg-red-600 hover:bg-red-700 text-white",
    cancelButtonClassName = "bg-gray-600 hover:bg-gray-700 text-white",
    titleClassName = "text-xl font-bold text-center mb-4 text-red-500",
    messageClassName = "text-center text-gray-600"
}) => {
    if (!isOpen) return null;

    const renderMessage = () => {
        if (typeof message === "string" && itemToDelete) {
            return (
                <p className={messageClassName}>
                    {message}{" "}
                    <span className="font-semibold">"{itemToDelete}"</span>
                </p>
            );
        }
        return <div className={messageClassName}>{message}</div>;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/25">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="p-6">
                    <h2 className={titleClassName}>{title}</h2>
                    {renderMessage()}
                    <div className="flex justify-center mt-6 gap-4">
                        <Button
                            onClick={onClose}
                            className={cancelButtonClassName}
                        >
                            {cancelLabel}
                            {CancelIcon && <CancelIcon className="ml-2" size={20} />}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className={confirmButtonClassName}
                        >
                            {confirmLabel}
                            {ConfirmIcon && <ConfirmIcon className="ml-2" size={20} />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;