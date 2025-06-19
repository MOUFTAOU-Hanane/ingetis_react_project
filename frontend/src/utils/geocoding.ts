import { ICoordinate } from "../interfaces";

export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error('Erreur de géocodage:', error);
        return null;
    }
};

export const calculateMapCenter = (coordinates: ICoordinate[]): [number, number] => {
    if (coordinates.length === 0) return [0, 0];
    if (coordinates.length === 1) return [coordinates[0].lat, coordinates[0].lng];
    
    const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
    const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
    
    return [avgLat, avgLng];
};