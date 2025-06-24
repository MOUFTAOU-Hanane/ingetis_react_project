import React from 'react';

interface EventActionsProps {
    eventId: number;
    onViewDetails: (eventId: number) => void;
    onToggleComments: (eventId: number) => void;
    onRegister: (eventId: number) => void;
    onUnregister: (eventId: number) => void; 
    isRegistered: boolean;
}

const EventActions: React.FC<EventActionsProps> = ({
    eventId,
    onViewDetails,
    onToggleComments,
    onRegister,
    onUnregister, 
    isRegistered
}) => {
    return (
        <div className="pt-2 flex justify-between items-center">
            <button 
                className="text-yellow-800 font-bold hover:text-yellow-600 transition-colors flex items-center gap-1"
                onClick={() => onViewDetails(eventId)}
            >
                <span>Détails</span>
            </button>
            <button 
                className="text-yellow-800 font-bold hover:text-yellow-600 transition-colors flex items-center gap-1"
                onClick={() => onToggleComments(eventId)}
            >
                <span>Commenter</span>
            </button>

            {isRegistered ? (
                <button
                    className="rounded-lg px-6 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors font-medium"
                    onClick={() => onUnregister(eventId)}
                >
                    Annuler l'inscription
                </button>
            ) : (
                <button
                    className="rounded-lg px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white transition-colors font-medium"
                    onClick={() => onRegister(eventId)}
                >
                    S'inscrire
                </button>
            )}
        </div>
    );
};

export default EventActions;
