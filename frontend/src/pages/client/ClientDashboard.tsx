import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

// Types
interface Media {
  id_media: number;
  id_event: number;
  id_program?: number;
  type_media: string;
  url_media: string;
}

interface Program {
  id_program: number;
  titre: string;
  description: string;
  date_heure: string;
}

interface Lieu {
  id_lieu: number;
  nom: string;
  adresse: string;
  latitude: number;
  longitude: number;
  description: string;
}

interface Catalog {
  id_catalog: number;
  id_event: number;
  nom_catalogue: string;
  description: string;
}

interface Event {
  id_event: number;
  titre: string;
  description: string;
  date_debut: string;
  date_fin: string;
  lieu: Lieu;
  programs: Program[];
  medias: Media[];
  catalogs: Catalog[];
}

interface Reservation {
  id_reservation: number;
  id_event: number;
  event?: Event;
  date: string;
  nb_tickets: number;
  status: 'confirmée' | 'en_attente';
}

interface Favorite {
  id_favorite: number;
  id_oeuvre: number;
  titre: string;
  artiste: string;
  type: string;
  image_url?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

const ClientDashboard: React.FC = () => {
  const { user } = useAuth() as { user: User | null };
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'favorites' | 'profile'>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Formater une date pour l'affichage
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Formater une date et heure pour l'affichage
  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
  };

  // Vérifier si un événement est à venir
  const isUpcoming = (date: string): boolean => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today;
  };

  // Simuler le chargement des données
  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        // Simulation de délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Exemple d'événements basé sur la structure fournie
        const sampleEvents: Event[] = [
          {
            id_event: 1,
            titre: "Conférence React",
            description: "Découvrez les nouveautés de React.",
            date_debut: "2025-03-15",
            date_fin: "2025-03-15",
            lieu: {
                id_lieu: 11,
                nom: "Palais des Congrès",
                adresse: "123 Avenue des Technologies",
                latitude: 48.8566,
                longitude: 2.3522,
                description: "Centre de conférences moderne, équipé pour des événements tech."
            },
            programs: [
                {
                    id_program: 1,
                    titre: "Introduction à React 19",
                    description: "Présentation des nouvelles fonctionnalités",
                    date_heure: "2025-03-15T09:00:00"
                },
                {
                    id_program: 2,
                    titre: "Atelier Hooks Avancés",
                    description: "Pratique des hooks personnalisés",
                    date_heure: "2025-03-15T14:00:00"
                }
            ],
            medias: [
                {
                    id_media: 1,
                    id_event: 1,
                    id_program: 1,
                    type_media: "image",
                    url_media: "/images/react-conf.jpg"
                }
            ],
            catalogs: [
                {
                    id_catalog: 1,
                    id_event: 1,
                    nom_catalogue: "Programme détaillé",
                    description: "Tous les détails de la conférence"
                }
            ]
          },
          {
            id_event: 2,
            titre: "Festival d'Art Contemporain",
            description: "Exposition des artistes émergents.",
            date_debut: "2025-04-22",
            date_fin: "2025-04-25",
            lieu: {
                id_lieu: 12,
                nom: "Galerie Moderne",
                adresse: "45 Rue des Arts",
                latitude: 48.8646,
                longitude: 2.3532,
                description: "Espace d'exposition moderne au cœur de la ville."
            },
            programs: [
                {
                    id_program: 3,
                    titre: "Vernissage",
                    description: "Ouverture officielle du festival",
                    date_heure: "2025-04-22T18:00:00"
                }
            ],
            medias: [
                {
                    id_media: 3,
                    id_event: 2,
                    type_media: "image",
                    url_media: "/images/art-festival.jpg"
                }
            ],
            catalogs: [
                {
                    id_catalog: 2,
                    id_event: 2,
                    nom_catalogue: "Guide du festival",
                    description: "Programme et informations pratiques"
                }
            ]
          }
        ];
        
        // Exemple de réservations
        const sampleReservations: Reservation[] = [
          { 
            id_reservation: 101, 
            id_event: 1, 
            date: "2025-03-15", 
            nb_tickets: 2, 
            status: "confirmée",
            event: sampleEvents[0] 
          },
          { 
            id_reservation: 102, 
            id_event: 2, 
            date: "2025-04-22", 
            nb_tickets: 1, 
            status: "en_attente",
            event: sampleEvents[1]
          }
        ];
        
        // Exemple d'œuvres favorites
        const sampleFavorites: Favorite[] = [
          { 
            id_favorite: 201, 
            id_oeuvre: 301, 
            titre: "Abstraction en Rouge", 
            artiste: "Jean Dumont", 
            type: "Peinture",
            image_url: "/images/abstraction-rouge.jpg"
          },
          { 
            id_favorite: 202, 
            id_oeuvre: 302, 
            titre: "Harmonie", 
            artiste: "Marie Lefèvre", 
            type: "Sculpture",
            image_url: "/images/harmonie-sculpture.jpg"
          }
        ];
        
        setUserEvents(sampleEvents);
        setReservations(sampleReservations);
        setFavorites(sampleFavorites);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <Layout title="Tableau de bord">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6">
        <div className="container mx-auto">
          <p className="mt-2">Bienvenue, {user?.name || 'Utilisateur'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'reservations'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              Mes Réservations
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'favorites'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              Favoris
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              Profil
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-700 mb-2">Événements à venir</h3>
                    <p className="text-3xl font-bold text-purple-800">
                      {userEvents.filter(event => isUpcoming(event.date_debut)).length}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-700 mb-2">Réservations</h3>
                    <p className="text-3xl font-bold text-blue-800">{reservations.length}</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-pink-700 mb-2">Oeuvres favorites</h3>
                    <p className="text-3xl font-bold text-pink-800">{favorites.length}</p>
                  </div>
                </div>

                {/* Upcoming Events Preview */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Vos prochains événements</h2>
                    <NavLink to="/client/events" className="text-purple-600 hover:text-purple-800">
                      Voir tous
                    </NavLink>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userEvents.map(event => (
                      <div key={event.id_event} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex">
                          {event.medias && event.medias[0] && (
                            <div className="w-24 h-24 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                              <img 
                                src={event.medias[0].url_media} 
                                alt={event.titre}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/images/placeholder.jpg';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{event.titre}</h3>
                            <p className="text-gray-600 mt-1">
                              {formatDate(event.date_debut)}
                              {event.date_debut !== event.date_fin && 
                                ` - ${formatDate(event.date_fin)}`}
                            </p>
                            <p className="text-gray-600 text-sm">{event.lieu.nom}</p>
                            <div className="flex justify-between mt-3">
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {isUpcoming(event.date_debut) ? 'À venir' : 'Passé'}
                              </span>
                              <NavLink 
                                to={`/client/events/${event.id_event}`} 
                                className="text-purple-600 hover:text-purple-800"
                              >
                                Détails
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {userEvents.length === 0 && (
                      <div className="col-span-2 text-center p-8 border rounded-lg">
                        <p className="text-gray-600">Aucun événement à venir. Découvrez notre catalogue d'événements !</p>
                        <NavLink 
                          to="/client/events" 
                          className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                        >
                          Parcourir les événements
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>

                {/* Programs Preview */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Prochains programmes</h2>
                  <div className="space-y-3">
                    {userEvents.flatMap(event => 
                      event.programs.map(program => ({
                        ...program,
                        eventTitle: event.titre,
                        eventId: event.id_event
                      }))
                    )
                    .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime())
                    .slice(0, 3)
                    .map(program => (
                      <div key={program.id_program} className="flex items-center border-l-4 border-purple-500 pl-4 py-2">
                        <div className="mr-4 text-right min-w-24">
                          <div className="text-gray-600 text-sm">{formatDateTime(program.date_heure).split('à')[0]}</div>
                          <div className="font-medium">{formatDateTime(program.date_heure).split('à')[1]}</div>
                        </div>
                        <div>
                          <h4 className="font-medium">{program.titre}</h4>
                          <p className="text-sm text-gray-600">Événement: {program.eventTitle}</p>
                        </div>
                      </div>
                    ))}

                    {userEvents.flatMap(e => e.programs).length === 0 && (
                      <p className="text-gray-600 text-center py-4">Aucun programme à venir</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reservations Tab */}
            {activeTab === 'reservations' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Réservations</h2>
                
                {reservations.length > 0 ? (
                  <div className="space-y-4">
                    {reservations.map(reservation => (
                      <div key={reservation.id_reservation} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              {reservation.event?.titre || `Réservation #${reservation.id_reservation}`}
                            </h3>
                            <p className="text-gray-600 mt-1">Date: {formatDate(reservation.date)}</p>
                            <p className="text-gray-600">Billets: {reservation.nb_tickets}</p>
                            {reservation.event?.lieu && (
                              <p className="text-gray-600 text-sm">Lieu: {reservation.event.lieu.nom}</p>
                            )}
                          </div>
                          <div className="mt-3 md:mt-0">
                            <span 
                              className={`inline-block px-3 py-1 rounded-full text-sm ${
                                reservation.status === 'confirmée' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {reservation.status === 'confirmée' ? 'Confirmée' : 'En attente'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-3">
                          <button className="px-4 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50">
                            Annuler
                          </button>
                          <NavLink 
                            to={`/client/reservations/${reservation.id_reservation}`}
                            className="px-4 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                          >
                            Détails
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de réservations.</p>
                    <NavLink 
                      to="/client/events" 
                      className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                    >
                      Découvrir les événements
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Mes Oeuvres Favorites</h2>
                
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map(favorite => (
                      <div key={favorite.id_favorite} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex">
                          {favorite.image_url && (
                            <div className="w-20 h-20 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                              <img 
                                src={favorite.image_url} 
                                alt={favorite.titre}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/images/art-placeholder.jpg';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{favorite.titre}</h3>
                            <p className="text-gray-600 mt-1">Artiste: {favorite.artiste}</p>
                            <p className="text-gray-600">Type: {favorite.type}</p>
                            <div className="mt-3 flex justify-between">
                              <button className="text-red-500 hover:text-red-700">
                                Retirer des favoris
                              </button>
                              <NavLink 
                                to={`/client/oeuvres/${favorite.id_oeuvre}`}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                Voir détails
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore d'oeuvres favorites.</p>
                    <NavLink 
                      to="/client/oeuvres" 
                      className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                    >
                      Découvrir les oeuvres
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Mon Profil</h2>
                
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-medium">{user?.name || 'Utilisateur'}</h3>
                      <p className="text-gray-600">{user?.email || 'exemple@email.com'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700">Information personnelle</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nom</span>
                          <span>{user?.name || 'Non défini'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email</span>
                          <span>{user?.email || 'Non défini'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Téléphone</span>
                          <span>{user?.phone || 'Non défini'}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button className="text-purple-600 hover:text-purple-800">
                          Modifier
                        </button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700">Préférences</h3>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="emailNotif" className="mr-2" />
                          <label htmlFor="emailNotif">Recevoir des notifications par email</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="newsEvents" className="mr-2" />
                          <label htmlFor="newsEvents">M'informer des nouveaux événements</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="savePrefs" className="mr-2" />
                          <label htmlFor="savePrefs">Sauvegarder mes préférences artistiques</label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 text-sm">
                          Enregistrer les préférences
                        </button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-700">Sécurité</h3>
                      <div className="mt-3 space-y-3">
                        <button className="text-purple-600 hover:text-purple-800 block">
                          Changer de mot de passe
                        </button>
                        <button className="text-purple-600 hover:text-purple-800 block">
                          Activer l'authentification à deux facteurs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;