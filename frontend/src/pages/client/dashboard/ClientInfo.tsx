import React, { useState } from 'react'
import { IUser } from '../../../interfaces'
import ClientEditInfo from './ClientEditInfo';

interface ClientInfoProps {
    user: IUser;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ user }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    return (
        <>
            <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-700">Information personnelle</h3>
                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Nom</span>
                        <span>{user?.nom || 'Non défini'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span>{user?.email || 'Non défini'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Téléphone</span>
                        <span>{user?.telephone || 'Non défini'}</span>
                    </div>
                    {/* <div className="flex justify-between">
                        <span className="text-gray-600">Bibliographie</span>
                        <span>{user?.bibliographie || 'Non défini'}</span>
                    </div> */}
                </div>
                <div className="mt-3">
                    <button className="text-yellow-600 hover:text-yellow-800" onClick={() => setOpenModal(true)}>
                        Modifier
                    </button>
                </div>
            </div>
            {openModal && 
                <ClientEditInfo 
                    user={user}
                    onClose={() => setOpenModal(false)}
                />
            }
        </>
    )
}

export default ClientInfo