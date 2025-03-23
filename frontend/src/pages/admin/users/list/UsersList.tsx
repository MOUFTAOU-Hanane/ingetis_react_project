import React, { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { CircularProgress } from "@mui/material";
import { userService } from "../../../../services/userService";
import { IUser } from "../../../../interfaces";
import UserTable from "./UserTable";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await userService.fetchAll();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    return (
        <Layout title="Liste des utilisateurs">
            <div className="p-6">
                {loading ? (
                    <CircularProgress />
                ) : users.length > 0 ? (
                    <UserTable users={users} />
                ) : (
                    <h2>Pas encore d'utilisateurs à afficher.</h2>
                )}
            </div>
        </Layout>
    );
};

export default UsersList;