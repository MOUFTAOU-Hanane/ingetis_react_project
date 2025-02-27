import React from 'react'

interface ClientDashboardHeaderProps {
    activeTab: 'overview' | 'reservations' | 'favorites' | 'profile';
    setActiveTab: (tab: 'overview' | 'reservations' | 'favorites' | 'profile') => void;
}

const ClientDashboardHeader: React.FC<ClientDashboardHeaderProps> =({ activeTab, setActiveTab }) => {
    return (
        <div className="flex overflow-x-auto border-b">
            <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                    activeTab === 'overview'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
            >
                Vue d'ensemble
            </button>
            <button
                onClick={() => setActiveTab('reservations')}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                    activeTab === 'reservations'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
            >
                Mes Réservations
            </button>
            <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                    activeTab === 'favorites'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
            >
                Favoris
            </button>
            <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                    activeTab === 'profile'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
            >
                Profil
            </button>
        </div>
    )
}

export default ClientDashboardHeader
