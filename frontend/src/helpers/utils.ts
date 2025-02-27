// Formater une date pour l'affichage
export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Formater une date et heure pour l'affichage
export const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
};

// Vérifier si un événement est à venir
export const isUpcoming = (date: string): boolean => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today;
};