import L from 'leaflet';

export const createNumberedIcon = (
    number: number, 
    isFirst: boolean = false, 
    isLast: boolean = false
): L.DivIcon => {
    let color = '#3B82F6'; // Bleu par défaut
    if (isFirst) color = '#10B981'; // Vert pour le départ
    if (isLast) color = '#EF4444'; // Rouge pour l'arrivée
    
    return L.divIcon({
        html: `
            <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
                ${number}
            </div>
        `,
        className: 'custom-numbered-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
};