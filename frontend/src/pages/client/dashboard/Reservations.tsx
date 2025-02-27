import React from 'react'
import { Reservation as Re } from '../../../interfaces'
import { formatDate } from '../../../helpers/utils';
import { NavLink } from 'react-router-dom';

interface Reservations {
    reservations: Re[];
}
const Reservations: React.FC<Reservations> = ({reservations}) => {
    return (
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
    )
}

export default Reservations;