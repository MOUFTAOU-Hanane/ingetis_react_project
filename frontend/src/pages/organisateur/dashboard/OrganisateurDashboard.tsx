import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, Palette, Award, TrendingUp, MapPin } from 'lucide-react';
import Layout from '../../../components/Layout';
import { IEvent, IOeuvre, IParticipant } from '../../../interfaces';
import apiClient from '../../../apiClient';
import { toast } from 'react-toastify';

// Interfaces pour les données statistiques
interface DailyParticipantData {
  date: string;
  participants: number;
}

interface EventParticipantData {
  nom: string;
  participants: number;
  id_event: number;
}

interface OeuvreTypeData {
  type: string;
  count: number;
}

interface TopEventData extends IEvent {
  participantCount: number;
  tauxParticipation: string;
}

interface DashboardStats {
  participantsParJour: DailyParticipantData[];
  participantsParEvent: EventParticipantData[];
  tauxParticipation: number;
  topEvents: TopEventData[];
  oeuvreParType: OeuvreTypeData[];
}

const OrganisateurDashboard: React.FC = () => {
    const [oeuvres, setOeuvres] = useState<IOeuvre[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<DashboardStats>({
        participantsParJour: [],
        participantsParEvent: [],
        tauxParticipation: 0,
        topEvents: [],
        oeuvreParType: []
    });

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const [oeuvresRes, eventsRes, participantsRes] = await Promise.all([
                    apiClient.get<IOeuvre[]>('/oeuvres'),
                    apiClient.get<IEvent[]>('/events'),
                    apiClient.get<IParticipant[]>('/participants')
                ]);

                setOeuvres(oeuvresRes.data);
                setEvents(eventsRes.data);
                setParticipants(participantsRes.data);

                // Calculer les statistiques
                calculateStats(eventsRes.data, participantsRes.data, oeuvresRes.data);
            } catch (error) {
                toast.error("Une erreur s'est produite !");
                console.error("Erreur lors du chargement des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateStats = (events: IEvent[], participants: IParticipant[], oeuvres: IOeuvre[]): void => {
        // Participants par jour (7 derniers jours)
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        const participantsParJour: DailyParticipantData[] = last7Days.map(date => {
            const count = participants.filter(p => 
                p.date_inscription && new Date(p.date_inscription).toISOString().split('T')[0] === date
            ).length;
            return { date: formatDate(date), participants: count };
        });

        // Participants par événement
        const eventCounts: Record<number, number> = {};
        participants.forEach(p => {
            if (p.event?.id_event) {
                eventCounts[p.event.id_event] = (eventCounts[p.event.id_event] || 0) + 1; // Attente du backend
            }
        });

        const participantsParEvent: EventParticipantData[] = Object.entries(eventCounts)
            .map(([eventIdStr, count]) => {
                const eventId = parseInt(eventIdStr, 10);
                const event = events.find(e => e.id_event === eventId);
                return {
                    id_event: eventId,
                    nom: event ? event.titre.substring(0, 15) + (event.titre.length > 15 ? '...' : '') : 'Inconnu',
                    participants: count
                };
            })
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 5);

        // Taux de participation moyen (estimation)
        const tauxParticipation = events.length > 0 
            ? events.reduce((acc, event) => {
                const eventParticipants = participants.filter(p => p.event?.id_event === event.id_event).length;
                // Estimation de capacité à 50 personnes par défaut
                return acc + (eventParticipants / 50);
              }, 0) / events.length * 100
            : 0;

        // Top événements
        const topEvents: TopEventData[] = events
            .map(event => {
                const participantCount = participants.filter(p => p.event?.id_event === event.id_event).length;
                return {
                    ...event,
                    participantCount,
                    tauxParticipation: ((participantCount / 50) * 100).toFixed(0) + '%'
                };
            })
            .sort((a, b) => b.participantCount - a.participantCount)
            .slice(0, 3);

        // Répartition des œuvres par type
        const typeCount: Record<string, number> = {};
        oeuvres.forEach(oeuvre => {
            const type = oeuvre.type || 'Non défini';
            typeCount[type] = (typeCount[type] || 0) + 1;
        });

        const oeuvreParType: OeuvreTypeData[] = Object.entries(typeCount).map(([type, count]) => ({
            type,
            count
        }));

        setStats({
            participantsParJour,
            participantsParEvent,
            tauxParticipation: Math.round(tauxParticipation),
            topEvents,
            oeuvreParType
        });
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    const formatDateLong = (dateString: string | undefined): string => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const COLORS: string[] = ['#8B5CF6', '#6366F1', '#10B981', '#F59E0B', '#EC4899', '#EF4444'];

    useEffect(() => {
        console.log('stats', stats);
    }, [stats]);

    if (loading) {
        return (
            <Layout title='Tableau de bord'>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600">Chargement des données...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title='Tableau de bord'>
            <div className="space-y-6">
                {/* Cards de statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Œuvres</h2>
                            <Palette className="w-8 h-8 opacity-80" />
                        </div>
                        <p className="text-3xl font-semibold mt-2">{oeuvres.length}</p>
                        <p className="text-purple-200 mt-1 text-sm">dans la collection</p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Événements</h2>
                            <Calendar className="w-8 h-8 opacity-80" />
                        </div>
                        <p className="text-3xl font-semibold mt-2">{events.length}</p>
                        <p className="text-indigo-200 mt-1 text-sm">programmés</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Participants</h2>
                            <Users className="w-8 h-8 opacity-80" />
                        </div>
                        <p className="text-3xl font-semibold mt-2">{participants.length}</p>
                        <p className="text-blue-200 mt-1 text-sm">inscrits aux événements</p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-6 rounded-xl shadow-lg text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Taux de participation</h2>
                            <TrendingUp className="w-8 h-8 opacity-80" />
                        </div>
                        <p className="text-3xl font-semibold mt-2">{stats.tauxParticipation}%</p>
                        <p className="text-teal-200 mt-1 text-sm">moyenne des événements</p>
                    </div>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Participants (7 derniers jours)</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.participantsParJour}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="participants" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Répartition des œuvres par type</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.oeuvreParType}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="type"
                                        label={({type, percent}: {type: string, percent: number}) => 
                                            `${type}: ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {stats.oeuvreParType.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Top événements avec participants */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Top 5 Événements Populaires</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                    data={stats.participantsParEvent}
                                    layout="vertical"
                                >
                                    <XAxis type="number" />
                                    <YAxis dataKey="nom" type="category" width={150} />
                                    <Tooltip />
                                    <Bar dataKey="participants" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Liste des événements à venir */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center mb-4">
                            <Calendar className="text-indigo-600 w-6 h-6 mr-2" />
                            <h2 className="text-xl font-bold text-gray-800">Événements à venir</h2>
                        </div>
                        <div className="space-y-4">
                            {events
                                .filter(event => new Date(event.date_debut) > new Date())
                                .sort((a, b) => 
                                    new Date(a.date_debut).getTime() - new Date(b.date_debut).getTime()
                                )
                                .slice(0, 3)
                                .map((event, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <h3 className="font-semibold text-gray-800">{event.titre}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDateLong(event.date_debut)}
                                        </div>
                                        {event.lieu && (
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {event.lieu.nom || 'Lieu à confirmer'}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            <div className="mt-2 text-right">
                                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    Voir tous les événements →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tableau des événements populaires */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                        <Award className="text-purple-600 w-6 h-6 mr-2" />
                        <h2 className="text-xl font-bold text-gray-800">Événements Populaires</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Événement</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {stats.topEvents.map((event: any, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.titre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDateLong(event.date_debut)} - {formatDateLong(event.date_fin)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {event.lieu?.nom || 'À déterminer'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.participantCount}</td>
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
            </div>
        </Layout>
    );
};

export default OrganisateurDashboard;