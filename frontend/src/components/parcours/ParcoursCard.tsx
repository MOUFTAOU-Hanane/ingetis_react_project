import React from 'react';
import { IParcours } from '../../interfaces';
import { Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { ParcoursPDF } from './ParcoursPdf';

interface ParcoursCardProps {
    parcours: IParcours;
    isSelected: boolean;
    onClick: () => void;
}

export const ParcoursCard: React.FC<ParcoursCardProps> = ({ 
    parcours, 
    isSelected, 
    onClick 
}) => {
    const downloadParcoursPdf = async (parcours: IParcours) => {
        alert('aaaaa');
        try {
            // Générer le PDF
            const blob = await pdf(<ParcoursPDF parcours={parcours} />).toBlob();
            
            // Créer l'URL de téléchargement
            const url = URL.createObjectURL(blob);
            
            // Créer un lien temporaire pour le téléchargement
            const link = document.createElement('a');
            link.href = url;
            link.download = `parcours-${parcours.nom.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
            
            // Déclencher le téléchargement
            document.body.appendChild(link);
            link.click();
            
            // Nettoyer
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            // Optionnel : afficher une notification d'erreur à l'utilisateur
        }
    };

    return (
        <button
            onClick={onClick}
            className={`w-full sm:w-1/2 lg:w-1/3 xl:w-1/4
                text-left p-4 rounded-xl border transition-colors
                shadow-sm hover:shadow-md
                ${
                    isSelected
                        ? 'border-amber-600 bg-white text-amber-900 shadow-lg'
                        : 'border-amber-300 bg-white/70 text-amber-800 hover:border-amber-400 hover:bg-white/85'
                }`}
        >
            <div>
                <div className="flex items-center gap-2 mb-2 font-medium">
                    <svg className={`w-5 h-5 ${
                        isSelected
                            ? 'text-amber-600'
                            : 'text-gray-500'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 100 12 6 6 0 000-12zM2 18a8 8 0 0116 0H2z" />
                    </svg>
                    <span className={`${
                        isSelected
                            ? 'text-amber-600'
                            : 'text-gray-500'
                        }`}>{parcours.nom}</span>
                </div>
                <ul className={`pl-6 list-disc space-y-1 text-sm ${
                        isSelected
                            ? 'text-amber-600'
                            : 'text-gray-500'
                        }`}>
                    {parcours.lieux.map((lieu, i) => (
                        <li key={i}>
                            <span className={`block ${
                                isSelected
                                    ? 'text-amber-600'
                                    : 'text-gray-500'
                                }`}
                            >
                                {lieu.nom}</span>
                            <span className={`text-xs ${
                                isSelected
                                    ? 'text-orange-600'
                                    : 'text-gray-400'
                                }`}
                            >
                                {lieu.adresse}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <span 
                        title="Télécharger ce parcours" 
                        className="cursor-pointer text-amber-500 hover:text-amber-700 transition-colors"
                        onClick={() => downloadParcoursPdf(parcours)}
                    >
                        <Download size={16}/>
                    </span>
                </div>
            </div>
        </button>
    )

}
