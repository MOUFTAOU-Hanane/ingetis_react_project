import React, { useState } from 'react'
import { ILieu, IParcours } from '../../../../interfaces'
import { MapPin } from 'lucide-react';
import apiClient from '../../../../apiClient';
import EventSectionParcoursMap from './EventSectionParcoursMap';


const EventSectionParcours: React.FC<{ lieu: ILieu}> = ({lieu}) => {
    const [parcours, setParcours] = React.useState<{[key: string]: IParcours}>();
     const [showParcours, setShowParcours] = useState(false);

    const toggleParcours = () => {
        if (showParcours) {
            // Masquer
            setParcours({});
            setShowParcours(false);
        } else {
            // Afficher
            generateParcours();
        }
    };

    const generateParcours = () => {
        setParcours({}); 
        
        if (!lieu || !lieu.id_lieu) {
            console.error("Lieu is not defined or does not have an id_lieu");
            return;
        }

        const fetchParcours = async () => {
            try {
                const response = await apiClient.get(`/parcours/generate/${lieu.id_lieu}`);
                const data = await response.data;
                setParcours(data.parcours);
                setShowParcours(true);
            } catch (error) {
                console.error("Erreur lors de la récupération des parcours :", error);
            }
        };
        fetchParcours();
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-yellow-900 mb-3 mt-3 flex items-center gap-2">
                <MapPin size={18} />
                <span>Parcours</span>
            </h3>
            <div className='bg-white/5 text-white rounded-lg p-4'>
                <div>
                    Voulez-vous découvrir des parcours disponibles pour ce lieu ? Cliquez sur le bouton ci-dessous pour générer le parcours.
                </div>
                <button
                className={`mt-2 ${
                    showParcours ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white px-4 py-2 rounded mb-4 cursor-pointer transition-colors`}
                onClick={toggleParcours}
            >
                {showParcours ? "Masquer les parcours" : "Voir les parcours à proximité"}
            </button>
                {parcours && Object.keys(parcours).length > 0 ? (
                    <EventSectionParcoursMap parcours={parcours} />
                ) : (
                    <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <p className="text-white italic">Aucun parcours disponible pour ce lieu.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default EventSectionParcours
