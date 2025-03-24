import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../../components/Layout';
import { IOeuvre } from '../../../interfaces';
import SearchBar from '../../../components/SearchBar';
import OeuvresList from './OeuvresList';
import OeuvreModal from './OeuvreModal';
import OeuvreService from '../../../services/oeuvreService';

const OeuvresPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [oeuvres, setOeuvres] = useState<IOeuvre[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedOeuvre, setSelectedOeuvre] = useState<IOeuvre | null>(null);

    useEffect(() => {
        const fetchOeuvres = async () => {
            const data = await OeuvreService.fetchAll();
            setOeuvres(data);
        };

        fetchOeuvres();
    }, []);

    const openModal = (oeuvre: IOeuvre) => {
        setSelectedOeuvre(oeuvre);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOeuvre(null);
    };

    const filteredOeuvres = useMemo(() => {
        return oeuvres.filter((oeuvre) =>
            oeuvre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            oeuvre.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [oeuvres, searchTerm]);

    return (
        <Layout title="Nos Œuvres">
            <div className="space-y-8">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} type='oeuvre' />
                
                <OeuvresList 
                    oeuvres={filteredOeuvres} 
                    onOeuvreClick={openModal} 
                />
            </div>

            {modalOpen && selectedOeuvre && (
                <OeuvreModal 
                    oeuvre={selectedOeuvre} 
                    onClose={closeModal} 
                />
            )}
        </Layout>
    );
};

export default OeuvresPage;