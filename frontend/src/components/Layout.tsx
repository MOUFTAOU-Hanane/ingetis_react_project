import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-black">
            <div className="relative z-10">
                <Navbar />

                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-40 left-20 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20" />
                    <div className="absolute top-60 right-20 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-10" />
                </div>

                {/* Main content */}
                <div className="relative z-10">
                    <header className="py-12 px-6">
                        <div className="container mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                                {title}
                            </h1>
                        </div>
                    </header>

                    <main className="container mx-auto px-4 pb-16">
                        {/* Content wrapper with glass effect for content sections */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                            {children}
                        </div>
                    </main>

                    <footer className="py-8 mt-auto">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-white/80">
                                    © {new Date().getFullYear()} Event Master. Tous droits réservés.
                                </div>
                                <div className="flex gap-6">
                                    <a href="#" className="text-white/80 hover:text-white transition-colors">
                                        Privacy Policy
                                    </a>
                                    <a href="#" className="text-white/80 hover:text-white transition-colors">
                                        Terms of Service
                                    </a>
                                    <a href="#" className="text-white/80 hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Layout;