import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Layout from '../../../components/Layout';
import { Oeuvre } from '../../../interfaces';
import SearchBar from '../../../components/SearchBar';

const OeuvresPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [oeuvres] = useState<Oeuvre[]>([
        {
            id_oeuvre: 1,
            id_user: 1,
            titre: "Sculpture Moderne",
            type: "sculpture",
            description: "Une sculpture inspirée des formes géométriques modernes.",
            prix: 2000,
            image: "https://via.placeholder.com/400x400?text=Sculpture",
        },
        {
            id_oeuvre: 2,
            id_user: 2,
            titre: "Peinture Abstraite",
            type: "peinture",
            description: "Une peinture qui exprime la complexité des émotions humaines.",
            prix: 1500,
            image: "https://via.placeholder.com/400x400?text=Peinture",
        },
        {
            id_oeuvre: 3,
            id_user: 3,
            titre: "Vidéo Conceptuelle",
            type: "vidéo",
            description: "Un court-métrage explorant les limites de la perception humaine.",
            prix: 1000,
            image: "https://via.placeholder.com/400x400?text=Vidéo",
        },
        {
            id_oeuvre: 4,
            id_user: 4,
            titre: "Image Digitale",
            type: "image",
            description: "Une image digitale traitée artistiquement pour représenter la nature.",
            prix: 500,
            image: "https://via.placeholder.com/400x400?text=Image",
        }
    ]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);

    const openModal = (oeuvre: Oeuvre) => {
        setSelectedOeuvre(oeuvre);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOeuvre(null);
    };

    const filteredOeuvres = oeuvres.filter((oeuvre) =>
        oeuvre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oeuvre.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    src={oeuvre.image}
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
                                    <source src={selectedOeuvre.image} type="video/mp4" />
                                    Votre navigateur ne supporte pas les vidéos.
                                </video>
                            ) : (
                                <img
                                    src={selectedOeuvre.image}
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
