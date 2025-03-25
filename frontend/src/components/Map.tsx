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
    return (
        <div className="w-full h-64"> 
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