import apiClient from "../apiClient";
import { ILieu } from "../interfaces";

export const lieuService = {
    fetchAll: async (): Promise<ILieu[]> => {
        const response = await apiClient.get("/lieu");
        return response.data;
    },

    fetchById: async (id: number | string): Promise<ILieu> => {
        const response = await apiClient.get(`/lieu/${id}`);
        return response.data;
    },

    create: async (lieuData: Omit<ILieu, "id_lieu">): Promise<ILieu> => {
        const response = await apiClient.post("/lieu", lieuData);
        return response.data;
    },

    update: async (id: number | string, lieuData: Partial<ILieu>): Promise<ILieu> => {
        const response = await apiClient.put(`/lieu/${id}`, lieuData);
        return response.data.lieu;
    },

    delete: async (id: number | string): Promise<void> => {
        await apiClient.delete(`/lieu/${id}`);
    }
};
  