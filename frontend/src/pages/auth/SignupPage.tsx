import React from 'react';

import { NavLink } from 'react-router-dom';
import EventMasterLogo from '../../components/EventMasterLogo';

const SignUpPage: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-black text-white">
            <NavLink to="/" className="absolute top-4 left-4 z-10 text-2xl font-bold text-white">
                <EventMasterLogo />
            </NavLink>
            
            <div className="flex min-h-screen">
                <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-purple-700 to-purple-900 flex-col items-center justify-center p-12">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center mb-6">
                            <span className="text-white font-bold text-xl">Event Culture</span>
                        </div>
                        <h1 className="text-3xl font-bold">Rejoignez-nous</h1>
                        <p className="text-lg opacity-80">Completez ces étapes pour créer un compte</p>
                    </div>
                </div>

                <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
                        <p className="text-gray-400 mb-6">Ajoutez vos informations personnelles</p>

                        <div className="relative flex justify-center mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-gray-400">
                                Vous avez déjà un compte?
                                <NavLink to="/login" className="text-purple-500 hover:underline">
                                    Se connecter
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
