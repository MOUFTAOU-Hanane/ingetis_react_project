import React from 'react'
import { IMedia } from '../../../../interfaces'
import { Image } from 'lucide-react'

const EventSectionMedias: React.FC<{ medias: IMedia[]}> = ({medias}) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                <Image size={18} />
                <span>Galerie</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {medias.map((media) => (
                    <img
                        key={media.id_media}
                        src={`http://localhost:3005${media.url_media}`}
                        alt="Média de l'événement"
                        className="rounded-lg h-24 w-full object-cover"
                    />
                ))}
            </div>
        </div>
    )
}

export default EventSectionMedias
