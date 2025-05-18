import React from 'react'
import { IParticipant } from '../../../interfaces'
import { formatDate } from '../../../helpers/utils';
import { NavLink } from 'react-router-dom';

interface Reservations {
    reservations: IParticipant[];
}
const Reservations: React.FC<Reservations> = ({ reservations }) => {
    return (
        <div className="space-y-4">
            {reservations.map(reservation => (
                <div key={reservation.id_participant} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div>
                            <h3 className="text-lg font-medium">
                                {reservation.event?.titre || `Réservation #${reservation.id_participant}`}
                            </h3>
                            <p className="text-gray-600 mt-1">Date: {formatDate(reservation.date_inscription)}</p>
                            {reservation.event?.lieu && (
                                <p className="text-gray-600 text-sm">Lieu: {reservation.event.lieu.nom}</p>
                            )}
                        </div>
                    <div className="mt-3 md:mt-0">
                        <span 
                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                                reservation.statut == 'inscrit' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                            {reservation.statut}
                        </span>
                    </div>
                    </div>
                    <div className="mt-3 flex justify-end space-x-3">
                        <NavLink 
                            to={`/client/reservations/${reservation.id_participant}`}
                            className="px-4 py-1 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
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