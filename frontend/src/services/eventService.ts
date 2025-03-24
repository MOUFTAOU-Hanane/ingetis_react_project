import apiClient from "../apiClient";

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
    }
}