import React, { useState, useEffect } from 'react';
import { IEvent } from '../../../interfaces';
import Layout from '../../../components/Layout';
import SearchBar from '../../../components/SearchBar';
import EventComment from './comments/EventComment';
import { toast } from 'react-toastify';
import apiClient from '../../../apiClient';
import EventCard from './EventCard';

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events'); 
                setEvents(response.data.filter((event: IEvent) => event.medias.length > 0 && event.programs.length > 0)); //Programmes et Médias non vide
            } catch (error) {
                toast.error("Erreur lors de la récupération des évènements !");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
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
                            <div key={event.id_event} className='bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/15'>
                                <EventCard event={event} toggleEventExpansion={toggleEventExpansion} expandedEvents={expandedEvents} />
                                {expandedEvents.has(event.id_event) && (
                                    <EventComment event={event} />
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
