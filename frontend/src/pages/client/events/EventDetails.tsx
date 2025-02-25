import React, { useEffect, useState } from 'react';
import { Event } from '../../../interfaces';
import { Calendar, Image, BookOpen, MapPin, Info, Clock } from 'lucide-react';
import { formatDate } from './EventCard'; // Utilisez la fonction formatDate de EventCard
import apiClient from '../../../apiClient';
import { useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';


const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/${id}`);
        setEvent(response.data.event);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement", error);
        // Fallback : événement fictif
        setEvent({
            "id_event": 1,
            "titre": "Conférence React",
            "description": "Découvrez les nouveautés de React.",
            "date_debut": "2025-02-22",
            "date_fin": "2025-02-22",
            "lieu": {
                "id_lieu": 11,
                "nom": "Palais des Congrès",
                "adresse": "123 Avenue des Technologies",
                "latitude": 48.8566,
                "longitude": 2.3522,
                "description": "Centre de conférences moderne, équipé pour des événements tech."
            },
            "programs": [
                {
                    "id_program": 1,
                    "titre": "Introduction à React 19",
                    "description": "Présentation des nouvelles fonctionnalités",
                    "date_heure": "2025-02-22T09:00:00"
                },
                {
                    "id_program": 2,
                    "titre": "Atelier Hooks Avancés",
                    "description": "Pratique des hooks personnalisés",
                    "date_heure": "2025-02-22T14:00:00"
                }
            ],
            "medias": [
                {
                    "id_media": 1,
                    "id_event": 1,
                    "id_program": 1,
                    "type_media": "image",
                    "url_media": "/images/react-conf.jpg"
                },
                {
                    "id_media": 2,
                    "id_event": 1,
                    "id_program": 2,
                    "type_media": "vidéo",
                    "url_media": "/videos/hooks-workshop.mp4"
                }
            ],
            "catalogs": [
                {
                    "id_catalog": 1,
                    "id_event": 1,
                    "nom_catalogue": "Programme détaillé",
                    "description": "Tous les détails de la conférence"
                }
            ]
        },);
      }
    };
    fetchEvent();
  }, [id]);
  
  // Format date range for display
  const formatDateRange = (dateDebut: string, dateFin: string) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    
    // Same day event
    if (dateDebut === dateFin) {
      return formatDate(dateDebut);
    }
    
    // Multi-day event
    const debutFormatted = debut.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const finFormatted = fin.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    return `${debutFormatted} - ${finFormatted}`;
  };

  return (
    <Layout title={event?.titre || "Détails de l'événement"}>
      {event && (
        <>
          {/* Event Header Section - Newly Added */}
          <div className="mb-8">
            {/* Main image if available */}
            {event.medias && event.medias.length > 0 && (
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                <img
                  src={event.medias[0].url_media}
                  alt={event.titre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Event Title and Dates */}
            <h1 className="text-3xl font-bold text-white mb-2">{event.titre}</h1>
            <div className="flex items-center text-purple-300 mb-4">
              <Clock size={16} className="mr-1" />
              <span>{formatDateRange(event.date_debut, event.date_fin)}</span>
              {event.lieu && (
                <>
                  <span className="mx-2">•</span>
                  <MapPin size={16} className="mr-1" />
                  <span>{event.lieu.nom}</span>
                </>
              )}
            </div>
            
            {/* Event Description */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-white/90 leading-relaxed">{event.description}</p>
            </div>
          </div>

          {/* Programs */}
          {event.programs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                <Calendar size={18} />
                <span>Programme</span>
              </h3>
              <div className="space-y-3">
                {event.programs.map((program) => (
                  <div key={program.id_program} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-white">{program.titre}</h4>
                      <span className="text-purple-300">{formatDate(program.date_heure)}</span>
                    </div>
                    <p className="text-white/80 mt-1">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Gallery */}
          {event.medias.length > 1 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                <Image size={18} />
                <span>Galerie</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.medias.map((media) => (
                  <img
                    key={media.id_media}
                    src={media.url_media}
                    alt="Média de l'événement"
                    className="rounded-lg h-24 w-full object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Catalogs */}
          {event.catalogs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                <BookOpen size={18} />
                <span>Catalogues</span>
              </h3>
              <div className="space-y-3">
                {event.catalogs.map((catalog) => (
                  <div key={catalog.id_catalog} className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white">{catalog.nom_catalogue}</h4>
                    <p className="text-white/80 mt-1">{catalog.description}</p>
                    <button className="mt-2 text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1">
                      <Info size={14} />
                      <span>Télécharger</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
              <MapPin size={18} />
              <span>Lieu</span>
            </h3>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white">{event.lieu.nom}</h4>
              <p className="text-white/80">{event.lieu.adresse}</p>
              <p className="text-white/80 mt-2">{event.lieu.description}</p>
              <div className="mt-3 h-48 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={`/api/placeholder/800/400`}
                  alt="Plan du lieu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default EventDetails;