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
  id_oeuvre: number;
  titre: string;
  artiste: string;
  type: string;
  image_url?: string;
}

export interface IComment {
    id_comment: number;
    event: IEvent;
    user?: IUser;
    commentaire: string;
    created: Date;
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