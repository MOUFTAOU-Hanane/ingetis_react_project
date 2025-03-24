import React from 'react';
import ParticipantBarChart from './ParticipantBarChart';
import OeuvreTypePieChart from './OeuvreTypePieChart';

interface ChartSectionProps {
    participantsParJour: any[];
    oeuvreParType: any[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ 
    participantsParJour, 
    oeuvreParType 
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ParticipantBarChart data={participantsParJour} />
            <OeuvreTypePieChart data={oeuvreParType} />
        </div>
    );
};

export default ChartSection;