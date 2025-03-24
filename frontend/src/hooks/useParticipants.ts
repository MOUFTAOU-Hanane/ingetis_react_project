import { useState, useEffect } from 'react';
import { IParticipant } from '../interfaces';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';

export const useParticipants = () => {
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const getParticipants = async () => {
            try {
                setLoading(true);
                const data = await eventService.fetchParticipants();
                
                // Filtrer pour l'user connecté
                const filtered = data.filter(
                    (participant: IParticipant) => participant.user.id_user === user?.id_user
                );
                
                setParticipants(filtered);
            } catch (err) {
                setError('Erreur lors du chargement des participants');
            } finally {
                setLoading(false);
            }
        };

        if (user?.id_user) {
            getParticipants();
        }
    }, [user?.id_user]);

    const isRegisteredForEvent = (eventId: number): boolean => {
        return participants.some(participant => participant.event.id_event === eventId);
    };

    return { participants, loading, error, isRegisteredForEvent };
};