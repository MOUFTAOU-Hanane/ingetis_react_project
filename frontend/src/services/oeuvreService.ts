import apiClient from '../apiClient';
import { IOeuvre } from '../interfaces';
import { toast } from 'react-toastify';

export const OeuvreService = {
    fetchAll: async (): Promise<IOeuvre[]> => {
        try {
            const response = await apiClient.get('/oeuvres');
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la récupération des oeuvres !");
            console.log(error);
            return [];
        }
    }
};

export default OeuvreService;