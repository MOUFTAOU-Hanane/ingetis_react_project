import React from 'react'
import { IProgram } from '../../../../interfaces'
import { Calendar } from 'lucide-react'
import { formatDate } from '../EventCard'

const EventSectionPrograms: React.FC<{ programs: IProgram[]}> = ({programs}) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                <Calendar size={18} />
                <span>Programme</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {programs.map((program: IProgram) => (
                    <div
                        key={program.id_program}
                        className="bg-white/5 rounded-lg p-4"
                    >
                    <div className="flex justify-between">
                        <h4 className="font-medium text-white">{program.titre}</h4>
                        <span className="text-purple-300">
                            {formatDate(program.date_heure)}
                        </span>
                    </div>
                    <p className="text-white/80 mt-1">{program.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventSectionPrograms