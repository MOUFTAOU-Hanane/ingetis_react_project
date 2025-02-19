import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import apiClient from "../../../apiClient";
import Layout from "../../../components/Layout";

interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
    phone: string;
    bio: string;
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

    useEffect(() => {
        console.log({users})
    }, [users]);
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <Layout title='Liste des utilisateurs'>
            <div className="p-6">
                {users && users?.length ? 
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2 text-left">Photo</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Email</th>
                                    <th className="p-2 text-left">Phone</th>
                                    <th className="p-2 text-left">Bibliography</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users?.length && users?.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="p-2">
                                            <img
                                                src={user.photo}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="p-2 flex items-center gap-2">
                                            <FiUser /> {user.name}
                                        </td>
                                        <td className="p-2 flex items-center gap-2">
                                            <FiMail /> {user.email}
                                        </td>
                                        <td className="p-2 flex items-center gap-2">
                                            <FiPhone /> {user.phone}
                                        </td>
                                        <td className="p-2">{user.bio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> :
                    <div>
                        <h3>Pas encore d'utilisateurs à afficher.</h3>
                    </div>
                }
            </div>
        </Layout>
    );
};

export default UsersList;
