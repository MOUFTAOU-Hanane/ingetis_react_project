import React from "react";

interface EventModalProps {
  isOpen: boolean;
  event: {
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    id_lieu: number;
  } | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
  if (!event || !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-50">
        <h2 className="text-2xl font-semibold mb-4">Détails de l'événement</h2>
        <div>
          <div className="mb-4">
            <strong>Titre :</strong> {event.titre}
          </div>
          <div className="mb-4">
            <strong>Description :</strong> {event.description}
          </div>
          <div className="mb-4">
            <strong>Date de début :</strong> {new Date(event.date_debut).toLocaleString()}
          </div>
          <div className="mb-4">
            <strong>Date de fin :</strong> {new Date(event.date_fin).toLocaleString()}
          </div>
          <div className="mb-4">
            <strong>Lieu :</strong> {event.id_lieu}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </>
  );
};

export default EventModal;
