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
    date_heure: string;
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
    nom_catalogue: string;
    description: string;
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
}

export interface IOeuvre {
    id_oeuvre: number;
    id_user: number;
    titre: string;
    type: "image" | "peinture" | "sculpture" | "vidéo" | string;
    description: string;
    prix: number;
    image: string; // URL de l'image
}

export interface IParticipant {
    id_participant: number;
    id_user: number;
    id_event: number;
    statut: string;
    date_inscription: string;
}

export interface IComment {
    id_comment: number;
    id_user: number;
    id_event: number;
    commentaire: string;
    date_commentaire: string;
}

export interface IParcours {
    id_parcours: number;
    nom: string;
    description: string;
    lieu: ILieu;
    date_debut: string;
    date_fin: string;
}

// Types communs pour le tableau de bord client
export type TabType = 'overview' | 'reservations' | 'favorites' | 'profile';

export interface IReservation {
  id_reservation: number;
  event?: Event;
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

export interface IUser {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  role: 'user' | 'admin';
}