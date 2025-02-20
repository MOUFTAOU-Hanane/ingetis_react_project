import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventMasterLogo from './EventMasterLogo';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between px-6 py-2">
                {/* Logo and Brand */}
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-white"><EventMasterLogo/></span>
                </div>

                {/* Main Navigation */}
                <div className="bg-purple-500/90 backdrop-blur-sm px-6 py-2 rounded-[1.5rem]">
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/admin/events"
                            className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                        >
                            Events
                        </NavLink>
                        <NavLink
                            to="/admin/lieux"
                            className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                        >
                            Lieux
                        </NavLink>
                        <NavLink
                            to="/admin/users"
                            className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                        >
                            Users
                        </NavLink>
                        <NavLink
                            to="/admin/dashboard"
                            className="text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem]"
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </div>


                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
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
                            {user.role === 'user' && (
                                <NavLink
                                    to="/user/dashboard"
                                    className="text-white/90 hover:text-white"
                                >
                                    Dashboard
                                </NavLink>
                            )}
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
                <div className="md:hidden">
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
