import apiClient from "../apiClient";
import { IEvent, IProgram, IRegistrationRequest, IRegistrationResponse } from "../interfaces";

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

    async registerForEvent(registrationData: IRegistrationRequest): Promise<IRegistrationResponse> {
        try {
            const response = await apiClient.post(`/participants`, {
                id_event: registrationData.eventId,
                id_user: registrationData.participantId, 
                statut: 'demande'
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            };
        }
    },

    // registerForEvent: async (eventId: number, userId: number) => {
    //     try {
    //         await apiClient.post('/participants', {
    //             id_event: eventId,
    //             id_user: userId,
    //             statut: 'demande'
    //         });
    //         return true;
    //     } catch (error) {
    //         console.error('Error registering for event:', error);
    //         throw error;
    //     }
    // },

    fetchEvents: async (): Promise<IEvent[]> => {
        try {
            const response = await apiClient.get('/events');
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw error;
        }
    },
    
    deleteProgram: async (programId: number | undefined): Promise<void> => {
        try {
            await apiClient.delete(`/programs/${programId}`);
        } catch (error) {
            console.error("Error deleting program:", error);
            throw error;
        }
    },

    createProgram: async (program: IProgram): Promise<IProgram> => {
        try {
            const response = await apiClient.post('/programs', program);
            return response.data;
        } catch (error) {
            console.error("Error creating program:", error);
            throw error;
        }
    },

    updateProgram: async (programId: number | undefined, programData: IProgram): Promise<IProgram> => {
        try {
            const response = await apiClient.put(`/programs/${programId}`, programData);
            return response.data;
        } catch (error) {
            console.error("Error updating program:", error);
            throw error;
        }
    },

    // Vérification du ticket
    verifyTicket: async (ticketId: string): Promise<{ valid: boolean; ticket?: any }> => {
        try {
            const response = await apiClient.get(`/tickets/${ticketId}/verify`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
            return { valid: false };
        }
    },

    // Envoi du ticket par email
    sendTicketByEmail: async (ticketId: string, email: string): Promise<any> => {
        try {
            const response = await apiClient.post(`/tickets/${ticketId}/send-email`, { email });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            throw error;
        }
    }
};
