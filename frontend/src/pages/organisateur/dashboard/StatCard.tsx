import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    Icon: LucideIcon;
    gradientFrom: string;
    gradientTo: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    subtitle, 
    Icon, 
    gradientFrom, 
    gradientTo 
}) => (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} p-6 rounded-xl shadow-lg text-white`}>
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <Icon className="w-8 h-8 opacity-80" />
        </div>
        <p className="text-3xl font-semibold mt-2">{value}</p>
        <p className={`text-opacity-80 mt-1 text-sm`}>{subtitle}</p>
    </div>
);

export default StatCard;