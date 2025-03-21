import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../../components/Layout';
import { IOeuvre } from '../../../interfaces';
import SearchBar from '../../../components/SearchBar';
import apiClient from '../../../apiClient';
import { toast } from 'react-toastify';

const OeuvresPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [oeuvres, setOeuvres] = useState<IOeuvre[]>();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/oeuvres'); 
                setOeuvres(response.data);
            } catch (error) {
                toast.error("Erreur lors de la récupération des oeuvres !");
                console.log(error);
            }
        };

        fetchEvents();
    }, []);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedOeuvre, setSelectedOeuvre] = useState<IOeuvre | null>(null);

    const openModal = (oeuvre: IOeuvre) => {
        setSelectedOeuvre(oeuvre);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOeuvre(null);
    };

    const filteredOeuvres = useMemo(() => {
        if (oeuvres) {
            return oeuvres.filter((oeuvre) =>
                oeuvre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                oeuvre.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return [];  // Retourne un tableau vide si oeuvres est undefined ou null
    }, [oeuvres, searchTerm]);  // Ajout de searchTerm dans les dépendances   
    

    return (
        <Layout title="Nos Œuvres">
            <div className="space-y-8">
                {/* Barre de recherche */}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} type='oeuvre' />


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredOeuvres.map((oeuvre) => (
                        <div
                            key={oeuvre.id_oeuvre}
                            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/15 cursor-pointer"
                            onClick={() => openModal(oeuvre)}
                        >
                            <div className="relative">
                                <img
                                    src={`http://localhost:3005${oeuvre.image}`}
                                    alt={oeuvre.titre}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <div className="absolute top-0 left-0 bg-gradient-to-b from-transparent to-black/60 text-white p-4 w-full h-full flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold">{oeuvre.titre}</h3>
                                    <p className="mt-2">{oeuvre.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-lg font-bold">{oeuvre.prix}€</span>
                                        <span className="bg-purple-500 text-white py-1 px-3 rounded-full">{oeuvre.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedOeuvre && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={closeModal}>
                    <div
                        className="bg-white p-8 rounded-xl max-w-3xl w-full relative"
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur
                    >
                        {/* Bouton de fermeture */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-red-800 p-2 transition-all cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="relative">
                            {selectedOeuvre.type === 'vidéo' ? (
                                <video controls autoPlay className="w-full rounded-xl">
                                    <source src={`http://localhost:3005${selectedOeuvre.image}`} type="video/mp4" />
                                    Votre navigateur ne supporte pas les vidéos.
                                </video>
                            ) : (
                                <img
                                    src={`http://localhost:3005${selectedOeuvre.image}`}
                                    alt={selectedOeuvre.titre}
                                    className="w-full h-auto object-cover rounded-xl"
                                />
                            )}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">{selectedOeuvre.titre}</h3>
                            <p className="mt-2">{selectedOeuvre.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold">{selectedOeuvre.prix}€</span>
                                <span className="bg-purple-500 text-white py-1 px-3 rounded-full">{selectedOeuvre.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default OeuvresPage;
