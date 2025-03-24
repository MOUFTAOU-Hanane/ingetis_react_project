// src/components/dashboard/ParticipantBarChart.tsx
import React from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { DailyParticipantData } from '../../../services/organisateurService';

interface ParticipantBarChartProps {
    data: DailyParticipantData[];
}

const ParticipantBarChart: React.FC<ParticipantBarChartProps> = ({ data }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            Participants (7 derniers jours)
        </h2>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                        dataKey="participants" 
                        fill="#6366f1" 
                        radius={[4, 4, 0, 0]} 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default ParticipantBarChart;