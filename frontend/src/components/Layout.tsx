import React from 'react';
import Navbar from './Navbar'; 

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <header className="py-6 bg-gray-800">
                <h1 className="text-center text-3xl font-bold text-purple-500">{title}</h1>
            </header>

            <main className="container mx-auto p-4">{children}</main>
            
            <footer className="mt-auto bg-gray-800 py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Gestion App. Tous droits réservés.
            </footer>
        </div>
    );
};

export default Layout;
