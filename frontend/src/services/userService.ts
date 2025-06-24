import apiClient from "../apiClient";
import { IUser } from "../interfaces";

export interface UserFormData {
    nom: string;
    email: string;
    telephone: string;
    photo: File | null;
    bibliographie: string;
}

export const userService = {
    create: async (userData: UserFormData): Promise<any> => {
        const formData = new FormData();
        formData.append("nom", userData.nom);
        formData.append("email", userData.email);
        formData.append("telephone", userData.telephone);
        formData.append("bibliographie", userData.bibliographie);
        if (userData.photo) {
            formData.append("photo", userData.photo);
        }

        return await apiClient.post("/admin/users", formData);
    },

    fetchAll: async (): Promise<IUser[]> => {
        const response = await apiClient.get("/admin/users");
        return response.data;
    },

    fetchById: async (id: number): Promise<IUser> => {
        const response = await apiClient.get(`/admin/users/${id}`);
        return response.data;
    }
};