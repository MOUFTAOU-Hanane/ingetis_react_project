import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventMasterLogo from './EventMasterLogo';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="backdrop-blur-sm">
            <div className="container mx-auto grid grid-cols-3 items-center px-6 py-2">
                {/* Logo and Brand - Left */}
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-white"><EventMasterLogo/></span>
                </div>

                {/* Main Navigation - Center */}
                <div className="flex justify-center">
                    {user && (
                        user.role === 'admin' ? (
                            <div className="bg-purple-500/90 backdrop-blur-sm px-6 py-2 rounded-[1.5rem]">
                                <div className="hidden md:flex items-center space-x-8">
                                    <NavLink
                                        to="/events"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Evenements
                                    </NavLink>
                                    <NavLink
                                        to="/admin/lieux"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Lieux
                                    </NavLink>
                                    <NavLink
                                        to="/oeuvres"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Oeuvres
                                    </NavLink>
                                    <NavLink
                                        to="/admin/users"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Utilisateurs
                                    </NavLink>
                                </div>
                            </div>
                        ) : user.role === 'user' ? (
                            <div className="bg-purple-500/90 backdrop-blur-sm px-6 py-2 rounded-[1.5rem]">
                                <div className="hidden md:flex items-center space-x-8">
                                    <NavLink
                                        to="/client/events"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Evenements
                                    </NavLink>
                                    <NavLink
                                        to="/client/oeuvres"
                                        className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                                    >
                                        Oeuvres
                                    </NavLink>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>

                {/* Auth Buttons - Right */}
                <div className="flex items-center justify-end space-x-4">
                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                className="px-4 py-2 text-white/90 hover:text-white transition-colors"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="px-4 py-2 bg-white text-purple-500 rounded-full hover:bg-white/90 transition-colors"
                            >
                                Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <NavLink
                                to={`/${user.role}/dashboard`}
                                className="text-white/90 hover:text-white"
                            >
                                Tableau de Bord
                            </NavLink>

                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-white text-purple-500 rounded-full hover:bg-white/90 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden col-span-3 flex justify-end mt-2">
                    <button className="text-white">
                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;