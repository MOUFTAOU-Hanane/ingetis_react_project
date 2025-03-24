import React from 'react';
import { Award } from 'lucide-react';
import { IEvent } from '../../../interfaces';
import { formatDateLong } from '../../../helpers/utils';

interface PopularEventsSectionProps {
    topEvents: any;
}

const PopularEventsSection: React.FC<PopularEventsSectionProps> = ({ topEvents }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
                <Award className="text-purple-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">
                    Événements Populaires
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Événement
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Période
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lieu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Participants
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Taux
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {topEvents.map((event: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {event.titre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDateLong(event.date_debut)} - {formatDateLong(event.date_fin)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {event.lieu?.nom || 'À déterminer'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {event.participantCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        {event.tauxParticipation}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-right">
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                    Voir tous les événements →
                </button>
            </div>
        </div>
    );
};

export default PopularEventsSection;