import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { ITicket } from '../../../interfaces';

interface TicketModalProps {
    isOpen: boolean;
    ticketData: ITicket | undefined;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, ticketData, onClose }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if (ticketData) {
            generateQRCode();
        }
    }, [ticketData]);

    const generateQRCode = async () => {
        if (!ticketData) return;

        // Données à encoder dans le QR code
        const qrData = {
            ticketId: ticketData.id,
            eventId: ticketData.id,
            participantEmail: ticketData.participantEmail,
            ticketNumber: ticketData.ticketNumber,
            // URL de vérification (optionnel)
            verificationUrl: `verify-ticket/${ticketData.id}`
        };

        try {
            const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrCodeUrl(qrCodeDataUrl);
        } catch (error) {
            console.error('Erreur lors de la génération du QR code:', error);
        }
    };

    const downloadTicket = () => {
        if (!ticketData) return;

        // Créer un canvas pour générer l'image du ticket
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 600;
        canvas.height = 800;

        // Fond blanc
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner le contenu du ticket
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('TICKET D\'ÉVÉNEMENT', 50, 50);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Événement: ${ticketData.eventName}`, 50, 100);
        ctx.fillText(`Date: ${ticketData.eventDate}`, 50, 130);
        ctx.fillText(`Lieu: ${ticketData.eventLocation}`, 50, 160);
        ctx.fillText(`Participant: ${ticketData.participantName}`, 50, 190);
        ctx.fillText(`N° Ticket: ${ticketData.ticketNumber}`, 50, 220);

        // Ajouter le QR code si disponible
        if (qrCodeUrl) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 200, 300, 200, 200);
                
                // Télécharger l'image
                const link = document.createElement('a');
                link.download = `ticket-${ticketData.ticketNumber}.png`;
                link.href = canvas.toDataURL();
                link.click();
            };
            img.src = qrCodeUrl;
        }
    };

    if (!isOpen || !ticketData) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200">
                <div className="p-8">
                    <div className="text-center mb-6">
                        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg 
                                className="w-8 h-8 text-green-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M5 13l4 4L19 7" 
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Inscription confirmée !
                        </h2>
                        <p className="text-gray-600">
                            Voici votre ticket électronique
                        </p>
                    </div>

                    {/* Ticket */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6 border-2 border-dashed border-blue-200">
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">
                                {ticketData.eventName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                                📅 {ticketData.eventDate}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                📍 {ticketData.eventLocation}
                            </p>
                            <p className="text-sm text-gray-600">
                                🎫 N° {ticketData.ticketNumber}
                            </p>
                        </div>

                        {qrCodeUrl && (
                            <div className="flex justify-center mb-4">
                                <img 
                                    src={qrCodeUrl} 
                                    alt="QR Code du ticket" 
                                    className="border rounded"
                                />
                            </div>
                        )}

                        <div className="text-xs text-gray-500 text-center">
                            Présentez ce QR code à l'entrée de l'événement
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            onClick={downloadTicket}
                        >
                            📱 Télécharger le ticket
                        </button>
                        <button
                            className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;