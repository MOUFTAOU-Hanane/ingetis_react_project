import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Layout from '../../../components/Layout';
import { Event, Favorite, Reservation, User } from '../../../interfaces';
import dataEvents from '../../../data/events.json';
import dataReservations from '../../../data/reservations.json';
import dataFavorites from '../../../data/favorites.json';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import ClientDashboardHeader from './ClientDashboardHeader';
import { formatDate } from '../../../helpers/utils';
import Overview from './Overview';
import Reservations from './Reservations';
import { Favorites } from './Favorites';
import ClientProfile from './ClientProfile';
import apiClient from '../../../apiClient';

const ClientDashboard: React.FC = () => {
    const { user } = useAuth() as { user: User | null };
    const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'favorites' | 'profile'>('overview');
    const [loading, setLoading] = useState<boolean>(true);
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/events'); 
                setUserEvents(response.data);

                // A ajouter API
                setReservations(dataReservations);
                setFavorites(dataFavorites);
                setLoading(false);
            } catch (error) {
                toast.error("Erreur lors de la récupération des évènements !");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout title="Tableau de bord">
            {/* Header */}
            <div className="bg-purple-600 text-white p-6">
                <div className="container mx-auto">
                <p className="mt-2">Bienvenue, {user?.name || 'Utilisateur'}</p>
                </div>
            </div>

            {loading ? 
                <CircularProgress /> : (
                    <div className="container mx-auto py-8 px-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Tabs */}
                            <ClientDashboardHeader activeTab={activeTab} setActiveTab={setActiveTab}/>

                            {/* Tab Content */}
                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <Overview 
                                        userEvents={userEvents} 
                                        favorites={favorites} 
                                        reservations={reservations}
                                    />
                                )}

                                {/* Reservations Tab */}
                                {activeTab === 'reservations' && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Réservations</h2>
                                    {reservations.length > 0 ? (
                                        <Reservations reservations={reservations} />
                                    ) : (
                                        <div className="text-center p-8 border rounded-lg">
                                            <p className="text-gray-600 mb-4">Vous n'avez pas encore de réservations.</p>
                                            <NavLink 
                                            to="/client/events" 
                                            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                                            >
                                            Découvrir les événements
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                                )}

                                {/* Favorites Tab */}
                                {activeTab === 'favorites' && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Oeuvres Favorites</h2>
                                    
                                    {favorites.length > 0 ? (
                                        <Favorites favorites={favorites} />
                                    ) : (
                                        <div className="text-center p-8 border rounded-lg">
                                            <p className="text-gray-600 mb-4">Vous n'avez pas encore d'oeuvres favorites.</p>
                                            <NavLink 
                                                to="/client/oeuvres" 
                                                className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                                            >
                                                Découvrir les oeuvres
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                                )}

                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <ClientProfile user={user}/>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout>
    );
};

export default ClientDashboard;