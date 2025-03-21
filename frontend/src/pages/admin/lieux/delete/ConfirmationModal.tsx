import React from "react";
import { Trash, X } from "lucide-react";
import { Button } from "@mui/material";

interface IConfirmationModalProps {
    title: string,
    isOpen: boolean;
    lieuNom: string | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ isOpen, title, lieuNom, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-25">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-center mb-4 text-red-500">{title}</h2>
                    <p className="text-center text-gray-600">
                        Êtes-vous sûr de vouloir supprimer le lieu <span className="font-semibold">"{lieuNom}"</span> ?
                    </p>
                    <div className="flex justify-center mt-6 gap-4">
                        <div className="">
                            <Button
                                className="bg-gray-600 text-white hover:bg-gray-700"
                                onClick={onCancel}
                            >
                                Annuler <X size={20} />
                            </Button>
                        </div>
                        <div className="">
                            <Button
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={onConfirm}
                            >
                                Supprimer <Trash size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
