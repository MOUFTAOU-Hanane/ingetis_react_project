import React from 'react';
import OeuvreCard from './OeuvreCard';
import { IOeuvre } from '../../../interfaces';

interface OeuvresListProps {
    oeuvres: IOeuvre[];
    onOeuvreClick: (oeuvre: IOeuvre) => void;
}

const OeuvresList: React.FC<OeuvresListProps> = ({ oeuvres, onOeuvreClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {oeuvres.map((oeuvre) => (
                <OeuvreCard 
                    key={oeuvre.id_oeuvre} 
                    oeuvre={oeuvre} 
                    onClick={onOeuvreClick} 
                />
            ))}
        </div>
    );
};

export default OeuvresList;