import { IEvent } from "../../interfaces";

interface EventCardProps {
    event: IEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            {event.medias?.[0]?.url_media ? (
                <img
                    src={`http://localhost:3005${event.medias[0].url_media}`}
                    alt={event.titre}
                    className="w-full h-56 object-cover rounded-t-lg mb-4"
                />
            ) : (
                <img
                    src={`http://localhost:3005/uploads/default.jpg`}
                    alt={event.titre}
                    className="w-full h-56 object-cover rounded-t-lg mb-4"
                />
            )}
            <h4 className="text-2xl font-semibold text-white mb-4">{event.titre}</h4>
            <p className="text-white/90 mb-2">
                <strong>Date :</strong> {event.date_debut}
            </p>
            <p className="text-white/90 mb-4">
                <strong>Lieu :</strong> {event.lieu.adresse}
            </p>
            <p className="text-white/90 mb-6">{event.description}</p>
            <a
                href="#"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
                Voir plus
            </a>
        </div>
    );
};