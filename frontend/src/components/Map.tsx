import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapComponentProps {
    latitude: number;
    longitude: number;
    name: string;
}

const Map: React.FC<MapComponentProps> = ({ latitude, longitude, name }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    return (
        <div className="relative w-full h-64">
            {!isOnline && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80 text-red-600 font-semibold text-center p-4">
                    Vous êtes hors ligne.<br />La carte ne peut pas être chargée.
                </div>
            )}
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                    <Popup>{name}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
