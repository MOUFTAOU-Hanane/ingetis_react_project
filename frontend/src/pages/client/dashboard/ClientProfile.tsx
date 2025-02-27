import React from 'react'
import { User } from '../../../interfaces'
import ClientPreference from './ClientPreference';
import ClientSecurite from './ClientSecurite';
import ClientInfo from './ClientInfo';

interface ClientProfileProps {
    user: User | any;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ user }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mon Profil</h2>
            
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-600">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-medium">{user?.name || 'Utilisateur'}</h3>
                        <p className="text-gray-600">{user?.email || 'exemple@email.com'}</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <ClientInfo user={user} /> 

                    <ClientPreference />                
                    
                    <ClientSecurite />
                </div>
            </div>
        </div>
    )
}

export default ClientProfile;