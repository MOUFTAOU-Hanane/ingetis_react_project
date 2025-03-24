import React from 'react';
import { formatDateTime } from '../../../helpers/utils';
import { IProgram } from '../../../interfaces';

interface ProgramItemProps {
    program: IProgram;
}

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
    const [date, time] = formatDateTime(program.date_heure).split('à');

    return (
        <div className="flex items-center border-l-4 border-purple-500 pl-4 py-2">
            <div className="mr-4 text-right min-w-24">
                <div className="text-gray-600 text-sm">{date}</div>
                <div className="font-medium">{time}</div>
            </div>
            <div>
                <h4 className="font-medium">{program.titre}</h4>
                <p className="text-sm text-gray-600">Événement: {program.description}</p>
            </div>
        </div>
    );
};

export default ProgramItem;