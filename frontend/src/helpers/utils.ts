// Formater une date pour l'affichage
export const formatDate = (dateString: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Formater une date et heure pour l'affichage
export const formatDateTime = (dateTimeString: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
};

// Format date range for display
export const formatDateRange = (dateDebut: string, dateFin: string) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    // Same day event
    if (dateDebut === dateFin) {
        return formatDate(dateDebut);
    }

    // Multi-day event
    const debutFormatted = debut.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const finFormatted = fin.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return `${debutFormatted} - ${finFormatted}`;
};

// Vérifier si un événement est à venir
export const isUpcoming = (date: string): boolean => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today;
};