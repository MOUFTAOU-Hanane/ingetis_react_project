import React from 'react';
import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { OeuvreTypeData } from '../../../services/organisateurService';

interface OeuvreTypePieChartProps {
    data: OeuvreTypeData[];
}

const COLORS: string[] = [
    '#8B5CF6', '#6366F1', '#10B981', 
    '#F59E0B', '#EC4899', '#EF4444'
];

const OeuvreTypePieChart: React.FC<OeuvreTypePieChartProps> = ({ data }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            Répartition des œuvres par type
        </h2>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="type"
                        label={({type, percent}: {type: string, percent: number}) => 
                            `${type}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((_, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default OeuvreTypePieChart;