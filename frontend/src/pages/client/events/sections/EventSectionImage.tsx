import React from 'react';

interface EventSectionImageProps {
    imageUrl: string;
    title: string;
}

const EventSectionImage: React.FC<EventSectionImageProps> = ({ imageUrl, title }) => {
    return (
        <div className="md:col-span-1 h-64 md:h-full relative">
            <img
                src={imageUrl || "/api/placeholder/400/600"}
                alt={title}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Événement
            </div>
        </div>
    );
};

export default EventSectionImage;