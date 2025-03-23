import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Layout from '../../../components/Layout';
import { IEvent, IFavorite, IParticipant } from '../../../interfaces';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import ClientDashboardHeader from './ClientDashboardHeader';
import ClientDashboardTabs from './ClientDashboardTabs';
import { fetchEvents, fetchParticipants } from '../../../services/apiService';

const ClientDashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'favorites' | 'profile'>('overview');
    const [loading, setLoading] = useState<boolean>(true);
    const [userEvents, setUserEvents] = useState<IEvent[]>([]);
    const [reservations, setReservations] = useState<IParticipant[]>([]);
    const [favorites, setFavorites] = useState<IFavorite[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await fetchEvents();
                setUserEvents(eventsData.filter((event: IEvent) => 
                    event.medias.length > 0 && event.programs.length > 0
                ));

                const participantsData = await fetchParticipants();
                // Commenté dans le code d'origine, donc je garde la même logique
                // const userReservations = participantsData.filter(
                //     (reservation: IParticipant) => reservation.user.id_user === user?.id_user
                // );
                setReservations([]);

                // Note: Je suppose que vous souhaiterez importer les favoris depuis l'API plutôt que du JSON
                // Pour le moment, je garde la même fonctionnalité
                import('../../../data/favorites.json').then(module => {
                    setFavorites(module.default);
                });

                setLoading(false);
            } catch (error) {
                toast.error("Erreur lors de la récupération des données !");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id_user]);

    return (
        <Layout title="Tableau de bord">
            <div className="bg-purple-600 text-white p-6">
                <div className="container mx-auto">
                <p className="mt-2">Bienvenue, {user?.nom || 'Utilisateur'}</p>
                </div>
            </div>         

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="container mx-auto py-8 px-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <ClientDashboardHeader 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab}
                        />
                        
                        <ClientDashboardTabs
                            activeTab={activeTab}
                            userEvents={userEvents}
                            favorites={favorites}
                            reservations={reservations}
                            user={user}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ClientDashboard;