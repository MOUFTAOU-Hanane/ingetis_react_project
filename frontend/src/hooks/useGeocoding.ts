import { useState, useEffect } from 'react';
import { ILieu, ICoordinate } from '../interfaces';
import { geocodeAddress, calculateMapCenter } from '../utils/geocoding';

export const useGeocoding = (lieux: ILieu[]) => {
    const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const geocodeAllAddresses = async (): Promise<void> => {
            if (!lieux || lieux.length === 0) {
                setLoading(false);
                setError("Aucun lieu à géocoder");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const coords: ICoordinate[] = [];
                
                for (const lieu of lieux) {
                    // Utiliser les coordonnées existantes si disponibles, sinon géocoder
                    if (lieu.latitude && lieu.longitude) {
                        coords.push({
                            lat: lieu.latitude,
                            lng: lieu.longitude,
                            nom: lieu.nom,
                            adresse: lieu.adresse
                        });
                    } else {
                        const coord = await geocodeAddress(lieu.adresse);
                        if (coord) {
                            coords.push({
                                ...coord,
                                nom: lieu.nom,
                                adresse: lieu.adresse
                            });
                        }
                    }
                }

                setCoordinates(coords);
                setMapCenter(calculateMapCenter(coords));
                
                if (coords.length === 0) {
                    setError("Aucune adresse n'a pu être géocodée");
                }
            } catch (err) {
                setError("Erreur lors du géocodage des adresses");
                console.error('Erreur de géocodage:', err);
            } finally {
                setLoading(false);
            }
        };

        geocodeAllAddresses();
    }, [lieux]);

    return { coordinates, loading, error, mapCenter };
};