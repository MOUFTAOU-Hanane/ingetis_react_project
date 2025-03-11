import React from 'react'

interface ClientPreferenceProps {

}

const ClientPreference: React.FC<ClientPreferenceProps> = () => {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Préférences</h3>
            
            <div className="mt-3 space-y-3">
                <div className="flex items-center">
                    <input type="checkbox" id="emailNotif" className="mr-2" />
                    <label htmlFor="emailNotif">Recevoir des notifications par email</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="newsEvents" className="mr-2" />
                    <label htmlFor="newsEvents">M'informer des nouveaux événements</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="savePrefs" className="mr-2" />
                    <label htmlFor="savePrefs">Sauvegarder mes préférences artistiques</label>
                </div>
            </div>

            <div className="mt-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 text-sm">
                Enregistrer les préférences
                </button>
            </div>
        </div>
    )
}

export default ClientPreference