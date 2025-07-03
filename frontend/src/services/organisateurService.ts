import apiClient from '../apiClient';
import { formatDate } from '../helpers/utils';
import { IEvent, IOeuvre, IParticipant, IUser } from '../interfaces';

export interface DailyParticipantData {
    date: string;
    participants: number;
}

export interface EventParticipantData {
    nom: string;
    participants: number;
    id_event: number;
}

export interface OeuvreTypeData {
    type: string;
    count: number;
}

export interface TopEventData extends IEvent {
    participantCount: number;
    tauxParticipation: string;
}

export interface DashboardStats {
    participantsParJour: DailyParticipantData[];
    participantsParEvent: EventParticipantData[];
    tauxParticipation: number;
    topEvents: TopEventData[];
    oeuvreParType: OeuvreTypeData[];
}

export const dashboardService = (user: IUser | null) => ({
    async fetchDashboardData(): Promise<{ 
        oeuvres: IOeuvre[], 
        events: IEvent[], 
        participants: IParticipant[], 
        stats: DashboardStats 
    }> {
        const [oeuvresRes, eventsRes, participantsRes] = await Promise.all([
            apiClient.get<IOeuvre[]>('/oeuvres'),
            apiClient.get<IEvent[]>('/events'),
            apiClient.get<IParticipant[]>('/participants')
        ]);


        const stats = calculateStats(
            eventsRes.data.filter((event: IEvent) => event.createur.id_user === user?.id_user), 
            participantsRes.data, 
            oeuvresRes.data
        );

        return {
            oeuvres: oeuvresRes.data,
            events: eventsRes.data.filter((event: IEvent) => event.createur.id_user === user?.id_user),
            participants: participantsRes.data,
            stats
        };
    }
});


const calculateStats = (
    events: IEvent[], 
    participants: IParticipant[], 
    oeuvres: IOeuvre[]
): DashboardStats => {

    // Participants par jour (7 derniers jours)
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    const participantsParJour: DailyParticipantData[] = last7Days.map(date => {
        const count = participants.filter(p => 
            p.date_inscription && 
            new Date(p.date_inscription).toISOString().split('T')[0] === date
        ).length;
        return { 
            date: formatDate(date), 
            participants: count 
        };
    });

    // Participants par événement
    const eventCounts: Record<number, number> = {};
    participants.forEach(p => {
        if (p.event?.id_event) {
            eventCounts[p.event.id_event] = 
                (eventCounts[p.event.id_event] || 0) + 1;
        }
    });

    const participantsParEvent: EventParticipantData[] = Object.entries(eventCounts)
        .map(([eventIdStr, count]) => {
            const eventId = parseInt(eventIdStr, 10);
            const event = events.find(e => e.id_event === eventId);
            return {
                id_event: eventId,
                nom: event 
                    ? event.titre.substring(0, 15) + (event.titre.length > 15 ? '...' : '') 
                    : 'Inconnu',
                participants: count
            };
        })
        .sort((a, b) => b.participants - a.participants)
        .slice(0, 5);

    // Taux de participation moyen sur tous les événements valides
    const validEvents = events.filter(e => e.places_initial > 0);
    const tauxParticipation = validEvents.length > 0
        ? validEvents.reduce((acc, event) => {
            const placesOccupees = event.places_initial - event.places_disponible;
            return acc + (placesOccupees / event.places_initial);
        }, 0) / validEvents.length * 100
        : 0;


    // Top 3 événements selon nombre de participants
    const topEvents: TopEventData[] = events
        .map(event => {
            const participantCount = participants.filter(
                p => p?.id_event === event.id_event
            ).length;
            
            const placesOccupees = event.places_initial - event.places_disponible;
            const tauxParticipation = event.places_initial > 0
                ? (placesOccupees / event.places_initial) * 100
                : 0;

            return {
                ...event,
                participantCount,
                tauxParticipation: tauxParticipation.toFixed(0) + '%'
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

    const oeuvreParType: OeuvreTypeData[] = Object.entries(typeCount).map(
        ([type, count]) => ({ type, count })
    );

    return {
        participantsParJour,
        participantsParEvent,
        tauxParticipation: Math.round(tauxParticipation),
        topEvents,
        oeuvreParType
    };
}
