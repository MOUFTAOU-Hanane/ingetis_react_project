import React from 'react';

interface StatCardProps {
    title: string;
    value: number;
    bgColor: string;
    textColor: string;
    valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    bgColor, 
    textColor, 
    valueColor 
}) => {

    return (
        <div className={`${bgColor} p-4 rounded-lg`}>
            <h3 className={`text-lg font-medium ${textColor} mb-2`}>{title}</h3>
            <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
};

export default StatCard;