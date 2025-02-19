import React, { useEffect, useState } from "react";
import { MapPin, Edit, Trash } from "lucide-react"; // icônes de lucide-react
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";

interface Lieu {
    id: number;
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    description: string;
}

const LieuxList: React.FC = () => {
    const [lieux, setLieux] = useState<Lieu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLieux = async () => {
            try {
                const response = await apiClient.get("/admin/lieux");
                setLieux(response.data);
            } catch (error) {
                console.error("Failed to fetch lieux:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLieux();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <Layout title="Liste des lieux">
            <div className="p-6">
                {lieux && lieux?.length ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-500">
                            <thead className="bg-purple-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nom</th>
                                    <th className="px-6 py-3 text-left">Adresse</th>
                                    <th className="px-6 py-3 text-left">Latitude</th>
                                    <th className="px-6 py-3 text-left">Longitude</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lieux.map((lieu) => (
                                    <tr key={lieu.id} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-4">{lieu.nom}</td>
                                        <td className="px-6 py-4">{lieu.adresse}</td>
                                        <td className="px-6 py-4">{lieu.latitude}</td>
                                        <td className="px-6 py-4">{lieu.longitude}</td>
                                        <td className="px-6 py-4">{lieu.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Edit size={16} className="cursor-pointer text-blue-600" />
                                                <Trash size={16} className="cursor-pointer text-red-600" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-8">
                        <h3 className="text-lg text-gray-600">Pas encore de lieux à afficher.</h3>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default LieuxList;
