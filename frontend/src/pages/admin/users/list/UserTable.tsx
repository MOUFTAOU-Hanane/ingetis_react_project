// components/admin/users/components/UserTable.tsx
import React from "react";
import { Mail, Phone } from "lucide-react";
import { IUser } from "../../../../interfaces";
import UserAvatar from "../../../../components/UserAvatar";

interface UserTableProps {
    users: IUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
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
                        <UserRow key={user.id_user} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const UserRow: React.FC<{ user: IUser }> = ({ user }) => {
    return (
        <tr className="border-b hover:bg-gray-100 hover:text-gray-800 text-white">
            <td className="px-6 py-4">
                <UserAvatar user={user} />
            </td>
            <td className="px-6 py-4">{user.nom}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
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
    );
};

export default UserTable;