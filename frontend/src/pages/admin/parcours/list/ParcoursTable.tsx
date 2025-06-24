import React from "react";
import { Edit, Trash } from "lucide-react";
import { IParcours } from "../../../../interfaces";

interface ParcoursTableProps {
    parcours: IParcours[];
    onEdit: (parcours: IParcours) => void;
    onDelete: (parcours: IParcours) => void;
}

const ParcoursTable: React.FC<ParcoursTableProps> = ({ parcours, onEdit, onDelete }) => {
    if (!parcours.length) {
        return (
            <div className="flex justify-center items-center p-8">
                <h3 className="text-lg text-gray-600">Pas encore de parcours à afficher.</h3>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-gray-500">
                <thead className="bg-yellow-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    {/* <th className="px-6 py-3 text-left">Lieu</th>
                    <th className="px-6 py-3 text-left">Date de début</th>
                    <th className="px-6 py-3 text-left">Date de fin</th> */}
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {parcours.map((parcours) => (
                        <tr key={parcours.id_parcours} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{parcours.nom}</td>
                            {/* <td className="px-6 py-4">{parcours.lieu.nom}</td> */}
                            {/* <td className="px-6 py-4">{parcours.date_debut}</td>
                            <td className="px-6 py-4">{parcours.date_fin}</td> */}
                            <td className="px-6 py-4">{parcours.description}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Edit
                                        size={16}
                                        className="cursor-pointer text-blue-600"
                                        onClick={() => onEdit(parcours)}
                                    />
                                    <Trash
                                        size={16}
                                        className="cursor-pointer text-red-600"
                                        onClick={() => onDelete(parcours)}
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

export default ParcoursTable;