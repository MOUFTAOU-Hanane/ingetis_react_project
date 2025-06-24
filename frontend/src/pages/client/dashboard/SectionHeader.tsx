import React from 'react';
import { NavLink } from 'react-router-dom';

interface SectionHeaderProps {
    title: string;
    linkTo?: string;
    linkText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo, linkText }) => {
    return (
        <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {linkTo && linkText && (
                <NavLink to={linkTo} className="text-yellow-600 hover:text-yellow-800">
                    {linkText}
                </NavLink>
            )}
        </div>
    );
};

export default SectionHeader;