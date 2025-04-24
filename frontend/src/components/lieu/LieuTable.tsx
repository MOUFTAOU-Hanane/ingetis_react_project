import React from "react";
import { Edit, Trash, Eye, List } from "lucide-react";
import { ILieu } from "../../interfaces";

interface LieuTableProps {
    lieux: ILieu[];
    onView: (lieu: ILieu) => void;
    onEdit: (lieu: ILieu) => void;
    onDelete: (lieu: ILieu) => void;
    onAddParcours: (lieu: ILieu) => void;
}

const LieuTable: React.FC<LieuTableProps> = ({
    lieux,
    onView,
    onEdit,
    onDelete,
    onAddParcours,
}) => {
    if (!lieux.length) {
        return (
        <div className="flex justify-center items-center p-8">
            <h3 className="text-lg text-white">Pas encore de lieux à afficher.</h3>
        </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-white !hover:text-yellow-500">
                <thead className="text-yellow-500 bg-white">
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
                        <tr
                            key={lieu.id_lieu}
                            className="border-b hover:bg-yellow-300 hover:text-gray-800"
                        >
                            <td className="px-6 py-4">{lieu.nom}</td>
                            <td className="px-6 py-4">{lieu.adresse}</td>
                            <td className="px-6 py-4">{lieu.latitude}</td>
                            <td className="px-6 py-4">{lieu.longitude}</td>
                            <td className="px-6 py-4">{lieu.description}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                <Eye
                                    size={16}
                                    className="cursor-pointer text-green-400"
                                    onClick={() => onView(lieu)}
                                />
                                <Edit
                                    size={16}
                                    className="cursor-pointer text-blue-400"
                                    onClick={() => onEdit(lieu)}
                                />
                                <Trash
                                    size={16}
                                    className="cursor-pointer text-red-400"
                                    onClick={() => onDelete(lieu)}
                                />
                                <List
                                    size={16}
                                    className="cursor-pointer text-yellow-100"
                                    onClick={() => onAddParcours(lieu)}
                                />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LieuTable;
