import React from 'react'
import { ILieu } from '../../../../interfaces'
import { MapPin } from 'lucide-react'
import Map from '../../../../components/Map'

const EventSectionLieu: React.FC<{ lieu: ILieu}> = ({lieu}) => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <MapPin size={18} />
                <span>Lieu</span>
            </h3>
            <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white">{lieu.nom}</h4>
                <p className="text-white/80">{lieu.adresse}</p>
                <p className="text-white/80 mt-2">{lieu.description}</p>
                <div className="mt-3 h-48 rounded-lg overflow-hidden bg-gray-200">
                    <Map latitude={lieu.latitude} longitude={lieu.longitude} name={lieu.nom} />
                </div>
            </div>
        </div>
    )
}

export default EventSectionLieu
