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
    id_participant: number;
    user: IUser;
    event: IEvent;
    statut: string;
    date_inscription: Date;
    participants: IUser;
}

export interface IParcours {
    id_parcours?: number;
    nom: string;
    description: string;
    // lieu: ILieu;
    // date_debut: Date;
    // date_fin: Date;
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
    ticket?: {
        id: string;
        eventName: string;
        eventDate: string;
        eventLocation: string;
        participantName: string;
        participantEmail: string;
        registrationDate: string;
        ticketNumber: string;
        qrCodeData?: string;
    };
    error?: string;
}

export interface IRegistrationRequest {
    eventId: number;
    participantId?: number; 
    additionalInfo?: string;
}

export interface ITicket {
    id: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    participantName: string;
    participantEmail: string;
    registrationDate: string;
    ticketNumber: string;
    qrCodeData?: string;
}
