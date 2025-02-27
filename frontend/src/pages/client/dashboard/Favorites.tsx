import React from 'react'
import { Favorite } from '../../../interfaces';
import { NavLink } from 'react-router-dom';

interface FavoritesProps {
    favorites: Favorite[];
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map(favorite => (
                <div key={favorite.id_favorite} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex">
                        {favorite.image_url && (
                            <div className="w-20 h-20 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                                <img 
                                    src={favorite.image_url} 
                                    alt={favorite.titre}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/art-placeholder.jpg';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-medium">{favorite.titre}</h3>
                            <p className="text-gray-600 mt-1">Artiste: {favorite.artiste}</p>
                            <p className="text-gray-600">Type: {favorite.type}</p>
                                <div className="mt-3 flex justify-between">
                                <button className="text-red-500 hover:text-red-700">
                                    Retirer des favoris
                                </button>
                                <NavLink 
                                    to={`/client/oeuvres/${favorite.id_oeuvre}`}
                                    className="text-purple-600 hover:text-purple-800"
                                >
                                    Voir détails
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
