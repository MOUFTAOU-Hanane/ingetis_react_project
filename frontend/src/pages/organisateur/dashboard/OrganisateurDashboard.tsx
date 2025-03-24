import React from 'react';
import Layout from '../../../components/Layout';
import useOrgDashboardData from '../../../hooks/useOrgDashboardData';
import StatisticsSection from './StatisticsSection';
import ChartSection from './ChartSection';
import UpcomingEventsSection from './UpcomingEventsSection';
import PopularEventsSection from './PopularEventsSection';

const OrganisateurDashboard: React.FC = () => {
    const { 
        oeuvres, 
        events, 
        participants, 
        stats, 
        loading 
    } = useOrgDashboardData();

    if (loading) {
        return (
            <Layout title='Tableau de bord'>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600">
                        Chargement des données...
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title='Tableau de bord'>
            <div className="space-y-6">
                <StatisticsSection 
                    oeuvresCount={oeuvres.length}
                    eventsCount={events.length}
                    participantsCount={participants.length}
                    participationRate={stats.tauxParticipation}
                />

                <ChartSection 
                    participantsParJour={stats.participantsParJour}
                    oeuvreParType={stats.oeuvreParType}
                />

                <UpcomingEventsSection events={events} />

                <PopularEventsSection topEvents={stats.topEvents} />
            </div>
        </Layout>
    );
};
export default OrganisateurDashboard;
