// src/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { dashboardService, DashboardStats } from '../services/organisateurService';
import { IEvent, IOeuvre, IParticipant } from '../interfaces';

const useOrgDashboardData = () => {
    const [oeuvres, setOeuvres] = useState<IOeuvre[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<DashboardStats>({
        participantsParJour: [],
        participantsParEvent: [],
        tauxParticipation: 0,
        topEvents: [],
        oeuvreParType: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { 
                    oeuvres, 
                    events, 
                    participants, 
                    stats 
                } = await dashboardService.fetchDashboardData();
                
                setOeuvres(oeuvres);
                setEvents(events);
                setParticipants(participants);
                setStats(stats);
            } catch (error) {
                toast.error("Une erreur s'est produite !");
                console.error("Erreur lors du chargement des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { 
        oeuvres, 
        events, 
        participants, 
        stats, 
        loading 
    };
};

export default useOrgDashboardData;