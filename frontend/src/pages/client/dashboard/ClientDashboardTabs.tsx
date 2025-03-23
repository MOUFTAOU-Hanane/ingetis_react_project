import React from 'react';
import { IEvent, IFavorite, IParticipant } from '../../../interfaces';
import Overview from './Overview';
import Reservations from './Reservations';
import { Favorites } from './Favorites';
import ClientProfile from './ClientProfile';
import EmptyState from './EmptyState';

interface ClientDashboardTabsProps {
    activeTab: 'overview' | 'reservations' | 'favorites' | 'profile';
    userEvents: IEvent[];
    favorites: IFavorite[];
    reservations: IParticipant[];
    user: any; // Utilisez le type approprié de votre contexte Auth
}

const ClientDashboardTabs: React.FC<ClientDashboardTabsProps> = ({ 
    activeTab, 
    userEvents, 
    favorites, 
    reservations, 
    user 
}) => {
    return (
        <div className="p-6">
            {activeTab === 'overview' && (
                <Overview 
                    userEvents={userEvents} 
                    favorites={favorites} 
                    reservations={reservations}
                />
            )}

            {activeTab === 'reservations' && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Réservations</h2>
                    {reservations.length > 0 ? (
                        <Reservations reservations={reservations} />
                    ) : (
                        <EmptyState 
                            message="Vous n'avez pas encore de réservations." 
                            buttonText="Découvrir les événements"
                            linkTo="/client/events"
                        />
                    )}
                </div>
            )}

            {activeTab === 'favorites' && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Oeuvres Favorites</h2>
                    
                    {favorites.length > 0 ? (
                        <Favorites favorites={favorites} />
                    ) : (
                        <EmptyState 
                            message="Vous n'avez pas encore d'oeuvres favorites." 
                            buttonText="Découvrir les oeuvres"
                            linkTo="/client/oeuvres"
                        />
                    )}
                </div>
            )}

            {activeTab === 'profile' && (
                <ClientProfile user={user}/>
            )}
        </div>
    );
};

export default ClientDashboardTabs;