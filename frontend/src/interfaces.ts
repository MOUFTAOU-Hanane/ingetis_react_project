export interface Lieu {
    id_lieu: number;
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    description: string;
}

export interface Program {
    id_program?: number;
    titre: string;
    description: string;
    date_heure: string;
}

export interface Media {
    id_media: number;
    id_event?: number;
    id_program?: number;
    id_catalog?: number;
    type_media: "image" | "vidéo" | string;
    url_media: string;
}

export interface Catalog {
    id_catalog: number;
    id_event: number;
    nom_catalogue: string;
    description: string;
}

export interface Event {
    id_event: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    lieu: Lieu;
    programs: Program[];
    medias: Media[];
    catalogs: Catalog[];
}

export interface Oeuvre {
    id_oeuvre: number;
    id_user: number;
    titre: string;
    type: "image" | "peinture" | "sculpture" | "vidéo" | string;
    description: string;
    prix: number;
    image: string; // URL de l'image
}

export interface Participant {
    id_participant: number;
    id_user: number;
    id_event: number;
    statut: string;
    date_inscription: string;
}

export interface Comment {
    id_comment: number;
    id_user: number;
    id_event: number;
    commentaire: string;
    date_commentaire: string;
}

export interface Parcours {
    id_parcours: number;
    nom: string;
    description: string;
    lieu: Lieu;
    date_debut: string;
    date_fin: string;
}
export interface Reservation {
    id_reservation: number;
    id_event: number;
    event?: Event;
    date: string;
    nb_tickets: number;
    status: 'confirmée' | 'en_attente';
}
  
export interface Favorite {
    id_favorite: number;
    id_oeuvre: number;
    titre: string;
    artiste: string;
    type: string;
    image_url?: string;
}