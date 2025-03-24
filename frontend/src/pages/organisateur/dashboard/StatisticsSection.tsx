import React from 'react';
import { Palette, Calendar, Users, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

interface StatisticsSectionProps {
    oeuvresCount: number;
    eventsCount: number;
    participantsCount: number;
    participationRate: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
    oeuvresCount,
    eventsCount,
    participantsCount,
    participationRate
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Œuvres" 
                value={oeuvresCount} 
                subtitle="dans la collection" 
                Icon={Palette}
                gradientFrom="from-purple-600" 
                gradientTo="to-purple-800"
            />
            <StatCard 
                title="Événements" 
                value={eventsCount} 
                subtitle="programmés" 
                Icon={Calendar}
                gradientFrom="from-indigo-500" 
                gradientTo="to-indigo-700"
            />
            <StatCard 
                title="Participants" 
                value={participantsCount} 
                subtitle="inscrits aux événements" 
                Icon={Users}
                gradientFrom="from-blue-500" 
                gradientTo="to-blue-700"
            />
            <StatCard 
                title="Taux de participation" 
                value={`${participationRate}%`} 
                subtitle="moyenne des événements" 
                Icon={TrendingUp}
                gradientFrom="from-teal-500" 
                gradientTo="to-teal-700"
            />
        </div>
    );
};

export default StatisticsSection;