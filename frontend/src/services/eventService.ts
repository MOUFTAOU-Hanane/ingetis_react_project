import apiClient from "../apiClient";
import { IEvent, IProgram } from "../interfaces";

export const eventService = {
    fetchParticipants: async () => {
        try {
            const response = await apiClient.get('/participants');
            return response.data;
        } catch (error) {
            console.error('Error fetching participants:', error);
            throw error;
        }
    },

    registerForEvent: async (eventId: number, userId: number) => {
        try {
            await apiClient.post('/participants', {
                id_event: eventId,
                id_user: userId,
                statut: 'demande'
            });
            return true;
        } catch (error) {
            console.error('Error registering for event:', error);
            throw error;
        }
    },

    async fetchEvents(): Promise<IEvent[]> {
        try {
            const response = await apiClient.get('/events');
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw error;
        }
    },
    
    async deleteProgram(programId: number | undefined): Promise<void> {
        try {
            await apiClient.delete(`/programs/${programId}`);
        } catch (error) {
            console.error("Error deleting program:", error);
            throw error;
        }
    },
    
    // You might want to add methods for creating/updating programs here
    async createProgram(program: any | undefined): Promise<IProgram> {
        try {
            const response = await apiClient.post('/programs', program);
            return response.data;
        } catch (error) {
            console.error("Error creating program:", error);
            throw error;
        }
    },
    
    async updateProgram(programId: number | undefined, programData: any | undefined): Promise<IProgram> {
        try {
            const response = await apiClient.put(`/programs/${programId}`, programData);
            return response.data;
        } catch (error) {
            console.error("Error updating program:", error);
            throw error;
        }
    }
}