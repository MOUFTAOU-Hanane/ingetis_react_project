import React from "react";
import { Chip } from "@mui/material";
import { MapPin } from "lucide-react";
import { Event } from "../../interfaces";

interface EventModalProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
  if (!event || !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-lg bg-opacity-25 z-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full z-50 border border-purple-500">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
          {event.titre}
        </h2>
        <div className="space-y-4">
          {/* Description */}
          <div>
            <p className="text-gray-700 text-sm">Description :</p>
            <p className="text-gray-900 font-medium">{event.description}</p>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2">
            <p className="text-gray-700 text-sm">Dates :</p>
            <Chip
              label={`${new Date(event.date_debut).toLocaleDateString()} → ${new Date(event.date_fin).toLocaleDateString()}`}
              color="secondary"
              className="bg-purple-500 text-white font-medium font-serif"
            />
          </div>

          {/* Lieu */}
          <div className="flex items-center gap-2">
            <MapPin className="text-purple-600" size={20} />
            <p className="text-gray-900 font-medium">
              {event.lieu.nom} - {event.lieu.adresse}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition cursor-pointer"
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
