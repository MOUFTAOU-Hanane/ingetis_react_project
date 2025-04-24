import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventMasterLogo from './EventMasterLogo';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu on mobile
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="backdrop-blur-sm">
            <div className="container mx-auto px-6 py-2 flex items-center">
                {/* Logo and Brand - Fixed width to maintain consistent spacing */}
                <div className="w-1/4">
                    <NavLink to="/" className="text-2xl font-bold text-white">
                        <EventMasterLogo />
                    </NavLink>
                </div>

                {/* Main Navigation - Centered with fixed width */}
                <div className="w-2/4 flex justify-center">
                    {user && (
                        <div className="bg-yellow-500/90 backdrop-blur-sm px-6 py-2 rounded-[1.5rem] flex items-center space-x-8 mx-auto">
                            {(user.role === 'admin' || user.role === 'organisateur') && (
                                <>
                                    <NavLink to="/events" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Evenements</NavLink>
                                    <NavLink to="/admin/lieux" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Lieux</NavLink>
                                    <NavLink to="/oeuvres" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Oeuvres</NavLink>
                                    {user.role === 'admin' && (
                                        <NavLink to="/admin/users" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Utilisateurs</NavLink>
                                    )}
                                </>
                            )}
                            {user.role === 'user' && (
                                <>
                                    <NavLink to="/user/events" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Evenements</NavLink>
                                    <NavLink to="/user/oeuvres" className={({ isActive }) => `text-white/80 hover:text-white hover:bg-gray-200/50 hover:backdrop-blur transition-colors px-4 py-[2px] rounded-[1.5rem] ${isActive ? 'bg-gray-200/50 backdrop-blur text-white' : ''}`}>Oeuvres</NavLink>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Auth Controls - Fixed width to maintain consistent spacing */}
                <div className="w-1/4 flex justify-end">
                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink to={`/${user.role}/dashboard`} className="text-white/80 hover:text-white">Tableau de Bord</NavLink>
                            <button onClick={logout} className="px-4 py-2 bg-white text-yellow-500 rounded-full hover:bg-white/90">Logout</button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink to="/login" className="text-white/90 hover:text-white px-4 py-2">Se connecter</NavLink>
                            <NavLink to="/register" className="bg-white text-yellow-500 px-4 py-2 rounded-full">S'inscrire</NavLink>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white">
                            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-yellow-500/90 backdrop-blur-sm px-6 py-4">
                    {user && (
                        <div className="space-y-4">
                            {(user.role === 'admin' || user.role === 'organisateur') && (
                                <>
                                    <NavLink to="/events" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Evenements</NavLink>
                                    <NavLink to="/admin/lieux" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Lieux</NavLink>
                                    <NavLink to="/oeuvres" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Oeuvres</NavLink>
                                    {user.role === 'admin' && (
                                        <NavLink to="/admin/users" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Utilisateurs</NavLink>
                                    )}
                                </>
                            )}
                            {user.role === 'user' && (
                                <>
                                    <NavLink to="/user/events" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Evenements</NavLink>
                                    <NavLink to="/user/oeuvres" className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Oeuvres</NavLink>
                                </>
                            )}
                            <div className="mt-4 flex flex-col space-y-4">
                                <NavLink to={`/${user.role}/dashboard`} className="block text-white/80 hover:text-white px-4 py-2 rounded-md">Tableau de Bord</NavLink>
                                <button onClick={logout} className="block text-white/80 hover:text-white px-4 py-2 rounded-md text-left">Logout</button>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div className="mt-4 flex items-center justify-between space-x-4">
                            <NavLink to="/login" className="text-white/90 hover:text-white px-4 py-2">Se connecter</NavLink>
                            <NavLink to="/register" className="bg-white text-yellow-500 px-4 py-2 rounded-full">S'inscrire</NavLink>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;