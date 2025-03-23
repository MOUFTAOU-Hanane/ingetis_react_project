import React, { useEffect, useState } from "react";
import { Mail, Phone, User } from "lucide-react"; // icônes de lucide-react
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";

interface User {
    id: number;
    nom: string;
    email: string;
    photo: string;
    telephone: string;
    bibliographie: string;
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get("/admin/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <Layout title="Liste des utilisateurs">
            <div className="p-6">
                {users && users?.length ? (
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-500">
                            <thead className="text-purple-500 bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Photo</th>
                                    <th className="px-6 py-3 text-left">Nom</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Téléphone</th>
                                    <th className="px-6 py-3 text-left">Bibliographie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-100 hover:text-gray-800 text-white">
                                        <td className="px-6 py-4">
                                            <img
                                                src={`http://localhost:3005${user.photo}`}
                                                alt={user.nom}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4">{user.nom}</td>
                                        <td className="px-6 py-4">
                                            <div className=" flex items-center gap-2">
                                                <Mail size={16} /> {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} /> {user.telephone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{user.bibliographie}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-8">
                        <h3 className="text-lg text-gray-600">Pas encore d'utilisateurs à afficher.</h3>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default UsersList;
