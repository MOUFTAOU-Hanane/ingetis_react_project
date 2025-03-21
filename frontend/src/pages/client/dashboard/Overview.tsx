import React from 'react'
import { NavLink } from 'react-router-dom';
import { IEvent, IFavorite, IParticipant } from '../../../interfaces';
import { formatDate, formatDateTime, isUpcoming } from '../../../helpers/utils';

interface OverviewProps {
    userEvents: IEvent[];
    reservations: IParticipant[];
    favorites: IFavorite[];
}

const Overview: React.FC <OverviewProps> = ({ userEvents, favorites, reservations }) => {
    return (
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
                    <NavLink to="/user/events" className="text-purple-600 hover:text-purple-800">
                        Voir tout
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userEvents.map(event => (
                        <div key={event.id_event} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex">
                                {event.medias && event.medias[0] && (
                                    <div className="w-24 h-24 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                                    <img 
                                        src={`http://localhost:3005${event.medias[0].url_media}`} 
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
                                            to={`/user/events/${event.id_event}`} 
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
                                to="/user/events" 
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
    )
}

export default Overview