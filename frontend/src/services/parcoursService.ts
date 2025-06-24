import apiClient from "../apiClient";
import { ILieu, IParcours } from "../interfaces";

export const parcoursService = {
    fetchById: async (id: string): Promise<ILieu> => {
        const response = await apiClient.get(`/lieu/${id}`);
        return response.data;
    },

    create: async (lieuId: string, parcours: IParcours[]): Promise<void> => {
        await apiClient.post(`/lieu/${lieuId}/parcours`, parcours);
    },

    fetchByLieuId: async (lieuId: string): Promise<IParcours[]> => {
        try {
            const response = await apiClient.get(`admin/lieux/${lieuId}/parcours`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch parcours:", error);
            throw error;
        }
    },

    delete: async (parcoursId: number): Promise<void> => {
        try {
            await apiClient.delete(`/admin/parcours/${parcoursId}`);
        } catch (error) {
            console.error("Failed to delete parcours:", error);
            throw error;
        }
    }


};