import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { IEvent } from '../../interfaces';

interface UpcomingEventsSectionProps {
    events: IEvent[];
    loading: boolean;
    error: string;
}

export const UpcomingEventsSection = ({ events, loading, error }: UpcomingEventsSectionProps) => {
    return (
        <motion.div
            className="mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
        >
            <h3 className="text-3xl font-semibold text-white mb-8">Événements à venir</h3>

            {/* Loading Spinner or Error Message */}
            {loading ? (
                <div className="text-white text-xl">Chargement des événements...</div>
            ) : error ? (
                <div className="text-red-500 text-xl">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event.id_event} event={event} />
                    ))}
                </div>
            )}
        </motion.div>
    );
};