import apiClient from '../apiClient';
import { IEvent, IParticipant, IFavorite } from '../interfaces';

/**
 * Récupère tous les événements depuis l'API
 */
export const fetchEvents = async (): Promise<IEvent[]> => {
    try {
        const response = await apiClient.get('/events');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
};

/**
 * Récupère tous les participants depuis l'API
 */
export const fetchParticipants = async (): Promise<IParticipant[]> => {
    try {
        const response = await apiClient.get('/participants');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des participants:', error);
        throw error;
    }
};

/**
 * Récupère les favoris d'un utilisateur
 * Note: Cette fonction est un placeholder jusqu'à ce qu'une API soit disponible
 */
export const fetchFavorites = async (userId: number): Promise<IFavorite[]> => {
    try {
        // Dans une implémentation réelle, cela serait un appel API
        // comme: const response = await apiClient.get(`/users/${userId}/favorites`);
        
        // Pour l'instant, on importe le fichier JSON
        const favoritesModule = await import('../data/favorites.json');
        return favoritesModule.default;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        throw error;
    }
};

/**
 * Récupère les réservations d'un utilisateur spécifique
 */
export const fetchUserReservations = async (userId: number): Promise<IParticipant[]> => {
    try {
        const allParticipants = await fetchParticipants();
        return allParticipants.filter(participant => participant.user.id_user === userId);
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations utilisateur:', error);
        throw error;
    }
};