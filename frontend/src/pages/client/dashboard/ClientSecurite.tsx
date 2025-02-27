import React from 'react'

const ClientSecurite = () => {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Sécurité</h3>
            <div className="mt-3 space-y-3">
                <button className="text-purple-600 hover:text-purple-800 block">
                    Changer de mot de passe
                </button>
                <button className="text-purple-600 hover:text-purple-800 block">
                    Activer l'authentification à deux facteurs
                </button>
            </div>
        </div>
    )
}

export default ClientSecurite