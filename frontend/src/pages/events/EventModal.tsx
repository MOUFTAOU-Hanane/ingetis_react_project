import React from "react";
import { Chip } from "@mui/material";
import { MapPin, ExternalLink, AlertTriangle } from "lucide-react";
import { IEvent } from "../../interfaces";
import { NavLink } from "react-router-dom";

interface EventModalProps {
  isOpen: boolean;
  event: IEvent | null;
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full z-50 border border-yellow-500">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
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
              className="bg-yellow-500 text-white font-medium font-serif"
            />
          </div>

          {/* Lieu */}
          <div className="flex items-center gap-2">
            <MapPin className="text-yellow-600" size={20} />
            <p className="text-gray-900 font-medium">
              {event.lieu.nom} - {event.lieu.adresse}
            </p>
          </div>

          {/* Liens vers les médias, catalogues et programmes */}
          <div className="space-y-2 mt-4">
            <Chip
              label={
                <span className="flex gap-1 items-center">
                  {!event.medias?.length && <AlertTriangle color="red" size={20} />}
                  Médias
                  <NavLink to={`/events/${event.id_event}/medias`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ExternalLink size={15} />
                  </NavLink>
                </span>
              }
              sx={{
                backgroundColor: '#FFB300',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: 'medium',
                '&:hover': {
                  backgroundColor: '#FF8F00',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }
              }}
              title="Voir les médias"
            />

            <Chip
              label={
                <span className="flex gap-1 items-center">
                  {!event.catalogs?.length && <AlertTriangle color="red" size={20} />}
                  Catalogues
                  <NavLink to={`/events/${event.id_event}/catalogs`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ExternalLink size={15} />
                  </NavLink>
                </span>
              }
              sx={{
                backgroundColor: '#FFB300',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: 'medium',
                '&:hover': {
                  backgroundColor: '#FF8F00',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }
              }}
              title="Voir les catalogues"
            />

            <Chip
              label={
                <span className="flex gap-1 items-center">
                  {!event.programs?.length && <AlertTriangle color="red" size={20} />}
                  Programmes
                  <NavLink to={`/events/${event.id_event}/programs`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ExternalLink size={15} />
                  </NavLink>
                </span>
              }
              sx={{
                backgroundColor: '#FFB300',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: 'medium',
                '&:hover': {
                  backgroundColor: '#FF8F00',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }
              }}
              title="Voir les programmes"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition cursor-pointer"
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
