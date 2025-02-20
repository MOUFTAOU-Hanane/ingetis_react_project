import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  eventTitre: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  eventTitre,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onCancel}
      ></div>

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-50">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">
          <p>Êtes-vous sûr de vouloir supprimer l'événement : <strong>{eventTitre}</strong> ?</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onConfirm}
          >
            Confirmer
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
