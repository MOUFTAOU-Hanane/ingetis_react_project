import React from 'react';
import { NavLink } from 'react-router-dom';

interface EmptyStateProps {
    message: string;
    buttonText: string;
    linkTo: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, buttonText, linkTo }) => {
    return (
        <div className="text-center p-8 border rounded-lg">
            <p className="text-gray-600 mb-4">{message}</p>
            <NavLink 
                to={linkTo} 
                className="px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
            >
                {buttonText}
            </NavLink>
        </div>
    );
};

export default EmptyState;