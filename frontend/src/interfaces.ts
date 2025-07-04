export interface ILieu {
    id_lieu: number;
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    description: string;
}

export interface IProgram {
    id_program?: number;
    event?: IEvent;
    id_event?: number;
    titre: string;
    description: string;
    date_heure: Date | string;
}

export interface IMedia {
    id_media: number;
    id_event?: number;
    id_program?: number;
    id_catalog?: number;
    type_media: "image" | "vidéo" | string;
    url_media: string;
}

export interface ICatalog {
    id_catalog: number;
    id_event: number;
    nom_catalogue?: string | undefined;
    description?: string | undefined;
}

export interface IEvent {
    id_event: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    lieu: ILieu;
    places_disponible: number;
    places_initial: number;
    comments: IComment[];
    programs: IProgram[];
    medias: IMedia[];
    catalogs: ICatalog[];
    createur: IUser;
}

export interface IOeuvre {
    id_oeuvre: number;
    user: IUser;
    titre: string;
    type: "image" | "peinture" | "sculpture" | "vidéo" | string;
    description: string;
    prix: number;
    image: null; // URL de l'image
}

export interface IParticipant {
    id_user: number;
    id_event: number;
    id_participant: number;
    user: IUser;
    event: IEvent;
    statut: string;
    date_inscription: Date;
    participants: IUser;
}

// export interface IParcours {
//     id_parcours?: number;
//     nom: string;
//     description: string;
//     // lieu: ILieu;
//     // date_debut: Date;
//     // date_fin: Date;
// }
export interface IParcours {
    id_parcours?: number;
    description?: string;
    lieux?: ILieu[];
    nom?: string;
}

// Types communs pour le tableau de bord client
export type TabType = 'overview' | 'reservations' | 'favorites' | 'profile';

export interface IReservation {
    id_reservation: number;
    event?: IEvent;
    date: string;
    nb_tickets: number;
    status: string;
}

export interface IFavorite {
    id_favorite: number;
    image_url?: string;
    titre?: string;
    artiste?: string;
    type?: string;
    id_oeuvre?: number;
    event: IEvent;
    user: IUser;
    created: Date;
}

export interface IComment {
    id_comment: number;
    event: IEvent;
    user?: IUser;
    commentaire: string;
    date_commentaire: Date;
}

export interface IUser {
    id_user: number;
    nom: string;
    email: string;
    telephone?: string;
    bibliographie?: string;
    photo?: string;
    role: 'user' | 'admin' | 'organisateur';
}

export interface IRegistrationResponse {
    success: boolean;
    ticket?: ITicket;
    error?: string;
}

export interface IRegistrationRequest {
    eventId: number;
    participantId?: number; 
    additionalInfo?: string;
}

export interface ITicket {
    id: string;
    ticketNumber: string;
    event: IEvent;
    participant: IUser;
    date: Date;
    qrCodeData?: string;
}

export interface ICoordinate {
    lat: number;
    lng: number;
    nom: string;
    adresse: string;
}

export interface IMarkerData extends ICoordinate {
    index: number;
    isFirst: boolean;
    isLast: boolean;
}