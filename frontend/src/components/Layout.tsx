import React from 'react';
import Navbar from './Navbar'; 

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="h-[100%] bg-gray-100">
            <Navbar />

            <div className=''>
                <header className="py-6">
                    <h1 className="text-center text-3xl font-bold text-purple-500">{title}</h1>
                </header>

                <main className="container mx-auto p-4">{children}</main>
                
                <footer className="mt-auto footer py-4 w-full text-center text-sm text-gray-500 !fixed !b-0">
                    <div className='text-center'>© {new Date().getFullYear()} Event Master. Tous droits réservés.</div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
