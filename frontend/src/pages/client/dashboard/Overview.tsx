import React from 'react';
import { IEvent, IFavorite, IParticipant } from '../../../interfaces';
import StatCard from './StatCard';
import ProgramItem from './ProgramItem';
import EmptyState from './EmptyState';
import EventCard from './EventCard';
import { isUpcoming } from '../../../helpers/utils';
import SectionHeader from './SectionHeader';

interface OverviewProps {
    userEvents: IEvent[];
    reservations: IParticipant[];
    favorites: IFavorite[];
}

const Overview: React.FC<OverviewProps> = ({ userEvents, reservations, favorites }) => {
    const upcomingEvents = userEvents.filter(event => isUpcoming(event.date_debut));

    // Get upcoming programs from all events
    const upcomingPrograms = userEvents
        .flatMap(event => 
            event.programs.map(program => ({
                ...program,
                eventTitle: event.titre,
                eventId: event.id_event
            }))
        )
        .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime())
        .slice(0, 3);

    return (
        <div>
        {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Événements à venir"
                    value={upcomingEvents.length}
                    bgColor="bg-yellow-50"
                    textColor="text-yellow-700"
                    valueColor="text-yellow-800"
                />
                <StatCard 
                    title="Réservations"
                    value={reservations.length}
                    bgColor="bg-blue-50"
                    textColor="text-blue-700"
                    valueColor="text-blue-800"
                />
                <StatCard 
                    title="Oeuvres favorites"
                    value={favorites.length}
                    bgColor="bg-pink-50"
                    textColor="text-pink-700"
                    valueColor="text-pink-800"
                />
            </div>

            {/* Upcoming Events Section */}
            <SectionHeader 
                title="Vos prochains événements" 
                linkTo="/user/events" 
                linkText="Voir tout" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userEvents.length > 0 ? (
                    userEvents.map(event => (
                        <EventCard key={event.id_event} event={event} />
                    ))
                ) : (
                    <EmptyState 
                        message="Aucun événement à venir. Découvrez notre catalogue d'événements !"
                        linkTo="/user/events"
                        buttonText="Parcourir les événements"
                    />
                )}
            </div>

            {/* Programs Preview Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Prochains programmes</h2>
                <div className="space-y-3">
                    {upcomingPrograms.length > 0 ? (
                        upcomingPrograms.map(program => (
                        <ProgramItem key={program.id_program} program={program} />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center py-4">Aucun programme à venir</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;