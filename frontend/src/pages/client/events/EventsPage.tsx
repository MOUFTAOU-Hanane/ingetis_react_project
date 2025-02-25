import React, { useState, useEffect } from 'react';
import { Event } from '../../../interfaces';
import Layout from '../../../components/Layout';
import SearchBar from '../../../components/SearchBar';
import { EventCard } from './EventCard';
import EventDetails from './EventDetails';
import EventComment from './EventComment';
import eventsData from '../../../data/events.json';

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

    useEffect(() => {
        setEvents(eventsData);
        setLoading(false);
    }, []);

    const toggleEventExpansion = (id: number) => {
        setExpandedEvents((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredEvents = events.filter((event) =>
        event.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.lieu.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout title="Découvrez Nos Événements">
            <div className="space-y-8">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} type="evenements" />
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white text-xl">Aucun événement trouvé</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredEvents.map((event) => (
                            <div key={event.id_event}>
                                <EventCard event={event} toggleEventExpansion={toggleEventExpansion} expandedEvents={expandedEvents} />
                                {expandedEvents.has(event.id_event) && (
                                    <>
                                        <EventComment eventId={event.id_event} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EventsPage;
