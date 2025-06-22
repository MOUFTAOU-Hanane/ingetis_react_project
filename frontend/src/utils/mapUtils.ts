import { IParcours } from '../interfaces';

export interface MapConfig {
    width?: number;
    height?: number;
    zoom?: number;
    style?: 'streets' | 'outdoors' | 'satellite' | 'terrain';
    provider?: 'mapbox' | 'google' | 'osm';
}

// Configuration des différents providers de cartes
const MAP_PROVIDERS = {
    mapbox: {
        baseUrl: 'https://api.mapbox.com/styles/v1/mapbox',
        styles: {
            streets: 'streets-v11',
            outdoors: 'outdoors-v11',
            satellite: 'satellite-v9',
            terrain: 'terrain-v10'
        }
    },
    google: {
        baseUrl: 'https://maps.googleapis.com/maps/api/staticmap'
    },
    osm: {
        baseUrl: 'https://render.openstreetmap.org/cgi-bin/export'
    }
};

export const generateStaticMapUrl = (
    parcours: IParcours, 
    config: MapConfig = {}
): string => {
    const {
        width = 600,
        height = 400,
        zoom = 12,
        style = 'streets',
        provider = 'mapbox'
    } = config;

    if (!parcours.lieux || parcours.lieux.length === 0) {
        return '';
    }

    // Filtrer les lieux avec coordonnées valides
    const validLieux = parcours.lieux.filter(
        lieu => lieu.latitude && lieu.longitude
    );

    if (validLieux.length === 0) {
        return '';
    }

    // Calculer le centre
    const centerLat = validLieux.reduce((sum, lieu) => sum + lieu.latitude!, 0) / validLieux.length;
    const centerLng = validLieux.reduce((sum, lieu) => sum + lieu.longitude!, 0) / validLieux.length;

    switch (provider) {
        case 'mapbox':
            return generateMapboxUrl(validLieux, centerLat, centerLng, width, height, zoom, style);
        
        case 'google':
            return generateGoogleMapsUrl(validLieux, centerLat, centerLng, width, height, zoom);
        
        case 'osm':
            return generateOSMUrl(validLieux);
        
        default:
            return generateMapboxUrl(validLieux, centerLat, centerLng, width, height, zoom, style);
    }
};

const generateMapboxUrl = (
    lieux: any[], 
    centerLat: number, 
    centerLng: number, 
    width: number, 
    height: number, 
    zoom: number, 
    style: string
): string => {
    // Créer les marqueurs avec différentes couleurs
    const markers = lieux.map((lieu, index) => {
        let color = 'blue';
        let label = (index + 1).toString();
        
        if (index === 0) {
            color = 'green';
            label = 'A';
        } else if (index === lieux.length - 1) {
            color = 'red';
            label = 'B';
        }
        
        return `pin-s-${label}+${color}(${lieu.longitude},${lieu.latitude})`;
    }).join(',');

    // Créer la route si plus de 2 points
    let route = '';
    if (lieux.length > 1) {
        const coordinates = lieux.map(lieu => `${lieu.longitude},${lieu.latitude}`).join(';');
        route = `/path-5+f44-0.5(${coordinates})`;
    }

    const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';
    const styleUrl = MAP_PROVIDERS.mapbox.styles[style as keyof typeof MAP_PROVIDERS.mapbox.styles];
    
    return `${MAP_PROVIDERS.mapbox.baseUrl}/${styleUrl}/static/${markers}${route}/${centerLng},${centerLat},${zoom},0/${width}x${height}@2x?access_token=${mapboxToken}`;
};

const generateGoogleMapsUrl = (
  lieux: any[], 
  centerLat: number, 
  centerLng: number, 
  width: number, 
  height: number, 
  zoom: number
): string => {
    const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY';
    
    // Créer les marqueurs
    const markers = lieux.map((lieu, index) => {
        let color = 'blue';
        let label = (index + 1).toString();
        
        if (index === 0) {
            color = 'green';
            label = 'A';
        } else if (index === lieux.length - 1) {
            color = 'red';
            label = 'B';
        }
        
        return `markers=color:${color}|label:${label}|${lieu.latitude},${lieu.longitude}`;
    }).join('&');

    // Créer le chemin si plus de 2 points
    let path = '';
    if (lieux.length > 1) {
        const coordinates = lieux.map(lieu => `${lieu.latitude},${lieu.longitude}`).join('|');
        path = `&path=color:0x0000ff|weight:3|${coordinates}`;
    }

    return `${MAP_PROVIDERS.google.baseUrl}?center=${centerLat},${centerLng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&${markers}${path}&key=${googleApiKey}`;
};

const generateOSMUrl = (lieux: any[]): string => {
    // Calculer les bounds
    const lats = lieux.map(lieu => lieu.latitude);
    const lngs = lieux.map(lieu => lieu.longitude);
    
    const minLat = Math.min(...lats) - 0.005;
    const maxLat = Math.max(...lats) + 0.005;
    const minLng = Math.min(...lngs) - 0.005;
    const maxLng = Math.max(...lngs) + 0.005;

    return `${MAP_PROVIDERS.osm.baseUrl}?bbox=${minLng},${minLat},${maxLng},${maxLat}&scale=25000&format=png`;
};

// Fonction pour générer une URL de prévisualisation plus simple
export const generatePreviewMapUrl = (parcours: IParcours): string => {
    return generateStaticMapUrl(parcours, {
        width: 400,
        height: 300,
        zoom: 11,
        provider: 'osm' // OSM ne nécessite pas de clé API
    });
};