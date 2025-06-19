import React from 'react';

interface EmptyStateProps {
    message: string;
    icon?: React.ReactNode;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
    message, 
    icon,
    className = "h-96" 
}) => (
    <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
            {icon && <div className="mb-2">{icon}</div>}
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
);