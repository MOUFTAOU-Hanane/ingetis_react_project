import React, { useState } from 'react';
import { eventService } from '../../../services/eventService';
import { toast } from 'react-toastify';

interface ConfirmationModalUnRegisterProps {
    isOpen: boolean;
    eventId: number | null;
    eventName?: string;
    participantId?: number;
    participantName: string;
    participantEmail: string;
    onClose: () => void;
    onConfirm: (eventId: number) => void;
}

const ConfirmationModalUnRegister: React.FC<ConfirmationModalUnRegisterProps> = ({
    isOpen,
    eventId,
    eventName = '',
    participantId,
    participantName,
    participantEmail,
    onClose,
    onConfirm
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleUnregister = async () => {
        if (!eventId || !participantId) {
            setError('Informations manquantes');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await eventService.unregisterFromEvent(participantId);

            onConfirm(eventId);
            onClose();
            toast.success('Vous avez été désinscrit avec succès.');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur désinscription:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isLoading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-start justify-center bg-black/60 z-50 p-4 pt-20"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 scale-100 animate-in fade-in">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                            <svg
                                className="w-8 h-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Confirmer la désinscription
                        </h2>
                        <div className="text-gray-600 leading-relaxed space-y-2">
                            <p>Souhaitez-vous vraiment vous désinscrire de :</p>
                            <p className="font-semibold text-gray-800">{eventName}</p>
                            <div className="text-sm bg-gray-50 rounded-lg p-3 mt-4">
                                <p><strong>Nom :</strong> {participantName}</p>
                                <p><strong>Email :</strong> {participantEmail}</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleUnregister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Désinscription...
                                </div>
                            ) : (
                                'Oui, me désinscrire'
                            )}
                        </button>
                        <button
                            className="flex-1 bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModalUnRegister;
