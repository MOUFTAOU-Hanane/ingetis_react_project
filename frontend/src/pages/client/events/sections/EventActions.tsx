import React from 'react';

interface EventActionsProps {
    eventId: number;
    onViewDetails: (eventId: number) => void;
    onToggleComments: (eventId: number) => void;
    onRegister: (eventId: number) => void;
    isRegistered: boolean;
}

const EventActions: React.FC<EventActionsProps> = ({
    eventId,
    onViewDetails,
    onToggleComments,
    onRegister,
    isRegistered
}) => {

    return (
        <div className="pt-2 flex justify-between items-center">
            <button 
                className="text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1"
                onClick={() => onViewDetails(eventId)}
            >
                <span>Détails</span>
            </button>
            <button 
                className="text-yellow-300 hover:text-purple-100 transition-colors flex items-center gap-1"
                onClick={() => onToggleComments(eventId)}
            >
                <span>Commenter</span>
            </button>
            
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 transition-colors font-medium"
                onClick={() => !isRegistered && onRegister(eventId)}
                disabled={isRegistered}
            >
                {isRegistered ? 'Déjà inscrit' : 'S\'inscrire'}
            </button>
        </div>
    );
};

export default EventActions;