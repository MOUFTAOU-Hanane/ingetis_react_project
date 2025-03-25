import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-full flex-grow">
            <div className="flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/90">
                {description}
            </p>
        </div>
    );
};