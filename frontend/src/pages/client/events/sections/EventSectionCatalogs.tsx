import React from 'react'
import { ICatalog } from '../../../../interfaces'
import { BookOpen } from 'lucide-react'

const EventSectionCatalogs: React.FC<{ catalogs: ICatalog[]}> = ({catalogs}) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <BookOpen size={18} />
                <span>Catalogues</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {catalogs.map((catalog) => (
                    <div
                        key={catalog.id_catalog}
                        className="bg-white/5 rounded-lg p-4"
                    >
                    <h4 className="font-medium text-white">
                        {catalog.nom_catalogue}
                    </h4>
                    <p className="text-white/80 mt-1">{catalog.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventSectionCatalogs
