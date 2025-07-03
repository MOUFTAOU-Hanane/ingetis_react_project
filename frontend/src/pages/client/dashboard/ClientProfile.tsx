import React, { useState } from 'react';
import { IUser } from '../../../interfaces';
import ClientSecurite from './ClientSecurite';
import ClientInfo from './ClientInfo';
import { Edit } from 'lucide-react';
import apiClient from '../../../apiClient';
import { toast } from 'react-toastify';

interface ClientProfileProps {
    user: IUser | any;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ user }) => {
    const [photo, setPhoto] = useState<string | null>(user?.photo || null);

    const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await apiClient.post('/api/upload-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setPhoto(response.data.photoUrl);
        } catch (error) {
            toast.error("Erreur lors de l'upload de la photo !");
            console.error("Erreur lors de l'upload de la photo :", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mon Profil</h2>

            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <div className="flex flex-col items-center justify-center mb-4 relative">
                        <label htmlFor="photo-upload" className="relative cursor-pointer">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt="Profil"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-yellow-200 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-yellow-600">
                                        {user?.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            )}

                            <div className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full shadow-md">
                                <Edit className="w-5 h-5 text-gray-600" />
                            </div>
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                        />
                    </div>

                    <div className="text-center mb-4">
                        <h3 className="text-xl font-medium">{user?.nom || 'Utilisateur'}</h3>
                        <p className="text-gray-600">{user?.email || 'exemple@email.com'}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ClientInfo user={user} />

                    {/* <ClientPreference /> */}

                    <ClientSecurite user={user}/>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
