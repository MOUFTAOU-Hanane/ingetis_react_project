import React from 'react'
import { User } from '../../../interfaces'

interface ClientInfoProps {
    user: User | null;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ user }) => {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Information personnelle</h3>
            <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Nom</span>
                    <span>{user?.name || 'Non défini'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span>{user?.email || 'Non défini'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Téléphone</span>
                    <span>{user?.phone || 'Non défini'}</span>
                </div>
            </div>
            <div className="mt-3">
                <button className="text-purple-600 hover:text-purple-800">
                    Modifier
                </button>
            </div>
        </div>
    )
}

export default ClientInfo