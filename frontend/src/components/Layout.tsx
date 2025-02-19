import React from 'react';
import Navbar from './Navbar'; 

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="bg-white text-white h-[100%]">
            <Navbar />

            <div className='bg-gray-100'>
                <header className="py-6">
                    <h1 className="text-center text-3xl font-bold text-purple-500">{title}</h1>
                </header>

                <main className="container mx-auto p-4">{children}</main>
                
                <footer className="mt-auto py-4 text-center text-sm text-gray-500 fixed b-0">
                    © {new Date().getFullYear()} Event Master. Tous droits réservés.
                </footer>
            </div>
        </div>
    );
};

export default Layout;
