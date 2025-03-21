import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import apiClient from '../apiClient';
import { HeroSection } from '../components/home/HeroSection';
import { IEvent } from '../interfaces';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { CallToActionSection } from '../components/home/CallToActionSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { FinalCallToAction } from '../components/home/FinalCallToAction';

const Home = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Fonction pour récupérer les événements via l'API
    const fetchEvents = async () => {
        try {
            const response = await apiClient.get('/events');
            setEvents(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des événements.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Layout title="Page d'accueil">
            <div className="container mx-auto px-4 py-12 text-center">
                <HeroSection />
                <FeaturesSection />
                <CallToActionSection />
                <TestimonialsSection />
                <UpcomingEventsSection 
                    events={events}
                    loading={loading}
                    error={error}
                />
                <FinalCallToAction />
            </div>
        </Layout>
    );
};

export default Home;