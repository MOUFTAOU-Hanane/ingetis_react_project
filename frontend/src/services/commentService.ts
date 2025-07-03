// services/commentService.ts
import apiClient from '../apiClient';
import { IComment } from '../interfaces';

export const commentService = {
    fetchByEvent: async (eventId: number): Promise<IComment[]> => {
        try {
            const response = await apiClient.get(`/comments/event/${eventId}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors du chargement des commentaires:", error);
            throw error;
        }
    },

    create: async (eventId: number, commentText: string, userId?: number): Promise<IComment> => {
        try {
            const response = await apiClient.post('/comments', {
                id_event: eventId,
                commentaire: commentText,
                id_user: userId
            });
            return response.data.newComment;
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            throw error;
        }
    },

    delete: async (commentId: number): Promise<void> => {
        console.log({commentId})
        try {
            await apiClient.delete(`/comments/${commentId}`);
        } catch (error) {
            console.error("Erreur de suppression:", error);
            throw error;
        }
    }
};