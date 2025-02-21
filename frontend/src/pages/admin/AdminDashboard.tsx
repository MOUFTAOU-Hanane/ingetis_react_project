import React from 'react';
import Layout from '../../components/Layout';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <Layout title="Tableau de bord">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Overview */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-xl font-semibold text-white mb-4">Vue d'Ensemble</h2>
                    <p className="text-white/80">Gérez les utilisateurs, événements et lieux avec une vue d'ensemble simplifiée.</p>
                </div>

                {/* Card 2: Events */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-xl font-semibold text-white mb-4">Événements</h2>
                    <p className="text-white/80">Gérez tous les événements actifs et à venir. </p>
                    <NavLink
                        to="/admin/events"
                        className="text-purple-700 hover:text-purple-900 hover:underline mt-4 inline-block"
                    >
                        Voir les événements
                    </NavLink>
                </div>

                {/* Card 3: Users */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-xl font-semibold text-white mb-4">Utilisateurs</h2>
                    <p className="text-white/80">Consultez et gérez les utilisateurs enregistrés.</p>
                    <NavLink
                        to="/admin/users"
                        className="text-purple-700 hover:text-purple-900 hover:underline mt-4 inline-block"
                    >
                        Voir les utilisateurs
                    </NavLink>
                </div>

                {/* Card 4: Lieux */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-xl font-semibold text-white mb-4">Lieux</h2>
                    <p className="text-white/80">Gérez les lieux où les événements ont lieu.</p>
                    <NavLink
                        to="/admin/lieux"
                        className="text-purple-700 hover:text-purple-900 hover:underline mt-4 inline-block"
                    >
                        Voir les lieux
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
