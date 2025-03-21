import Layout from '../components/Layout';
import { Calendar, Users, Zap, MessageCircle, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import apiClient from '../apiClient';

const Home = () => {
    const [events, setEvents] = useState<any[]>([]); // Tableau pour stocker les événements récupérés
    const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement en attendant la récupération des données
    const [error, setError] = useState<string>(''); // Message d'erreur en cas de problème avec l'API

    // Fonction pour récupérer les événements via l'API
    const fetchEvents = async () => {
        try {
            const response = await apiClient.get('/events');
            setEvents(response.data); // On met à jour l'état avec les événements récupérés
        } catch (err) {
            setError('Erreur lors du chargement des événements.');
        } finally {
            setLoading(false); // On arrête le chargement une fois l'API terminée
        }
    };

    useEffect(() => {
        fetchEvents(); // Appeler la fonction pour récupérer les événements au chargement de la page
    }, []);

    return (
        <Layout title="Page d'accueil">
            <div className="container mx-auto px-4 py-12 text-center">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Bienvenue dans Event Master
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                        Gérer, participer et découvrir des événements n'a jamais été aussi simple.
                    </p>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center mb-4">
                            <Calendar className="text-4xl text-white/80" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Événements</h3>
                        <p className="text-white/90">
                            Inscrivez-vous facilement aux événements qui vous intéressent et suivez leur évolution.
                        </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center mb-4">
                            <Users className="text-4xl text-white/80" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Participants</h3>
                        <p className="text-white/90">
                            Rejoignez une communauté active d'artistes, organisateurs et passionnés d'événements.
                        </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center mb-4">
                            <Zap className="text-4xl text-white/80" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Calendrier</h3>
                        <p className="text-white/90">
                            Explorez les événements à venir et ne manquez rien grâce à notre calendrier interactif.
                        </p>
                    </div>
                </motion.div>

                {/* Call to Action Section */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <p className="text-lg md:text-xl text-white/90">
                        Vous êtes organisateur ? Créez facilement des événements, gérez les inscriptions et l'expérience de vos participants.
                    </p>
                    <a
                        href="/"
                        className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                        Créez un événement
                    </a>
                </motion.div>

                {/* Testimonials Section */}
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <h3 className="text-3xl font-semibold text-white mb-8">Avis des utilisateurs</h3>
                    <div className="space-y-8">
                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center mb-4">
                                <MessageCircle className="text-2xl text-white/80 mr-4" />
                                <div>
                                    <p className="text-white font-semibold">Marie Dupont</p>
                                    <p className="text-white/90 text-sm">Participant à l'événement "Art et Culture"</p>
                                </div>
                            </div>
                            <p className="text-white/90">
                                "Un événement magnifique ! L'organisation était parfaite, et j'ai pu rencontrer des artistes incroyables. Merci Event Master pour cette expérience inoubliable !"
                            </p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center mb-4">
                                <MessageCircle className="text-2xl text-white/80 mr-4" />
                                <div>
                                    <p className="text-white font-semibold">Jean Lefevre</p>
                                    <p className="text-white/90 text-sm">Organisateur de l'événement "Tech Innovators"</p>
                                </div>
                            </div>
                            <p className="text-white/90">
                                "La plateforme a été un vrai atout pour gérer mon événement. J'ai pu suivre en temps réel les inscriptions et les retours des participants. Très satisfait de l'outil !"
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Upcoming Events Section */}
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
                                <div
                                    key={event.id}
                                    className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
                                >
                                    {/* Affichage de l'image */}
                                    {event.image && (
                                        <img
                                            src={`http://localhost:3005${event.image}`}
                                            alt={event.title}
                                            className="w-full h-56 object-cover rounded-t-lg mb-4"
                                        />
                                    )}
                                    <h4 className="text-2xl font-semibold text-white mb-4">{event.title}</h4>
                                    <p className="text-white/90 mb-2">
                                        <strong>Date :</strong> {event.date}
                                    </p>
                                    <p className="text-white/90 mb-4">
                                        <strong>Lieu :</strong> {event.location}
                                    </p>
                                    <p className="text-white/90 mb-6">{event.description}</p>
                                    <a
                                        href="#"
                                        className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                                    >
                                        Voir plus
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div
                    className="mt-16 text-center py-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                        Commencez cette aventure avec nous !
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-8">
                        Rejoignez une communauté passionnée par la gestion d'événements et l'innovation. Que vous soyez un organisateur ou un participant, il y a une place pour vous.
                    </p>
                    <div>
                        <a
                            href="/login"
                            className="inline-block bg-white text-purple-600 hover:bg-purple-100 px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-4 md:mb-0 md:mr-6"
                        >
                            Se connecter
                        </a>
                        <a
                            href="/signup"
                            className="inline-block bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Vous avez déjà un compte ? Continuer
                        </a>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Home;
