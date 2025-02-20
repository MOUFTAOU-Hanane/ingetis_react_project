import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();  

    return (
        <nav className="bg-gray-800 text-purple-500">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex w-full justify-between">
                    <span className="text-xl font-bold flex items-center">Event Master</span>
                    <div className="flex gap-4 !items-center">
                        {!user ? (
                            <>
                                <div className="hidden md:flex space-x-4">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                        `hover:text-white`
                                        }
                                    >
                                        Se connecter
                                    </NavLink>
                                </div>
                                <div className="hidden md:flex space-x-4 text-white p-2.5 rounded-lg bg-purple-500">
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                        `hover:text-white`
                                        }
                                    >
                                        S'inscrire
                                    </NavLink>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex space-x-4 items-center">
                                    {user.role === 'admin' && (
                                        <>
                                            <NavLink
                                                to="/admin/dashboard"
                                                className={({ isActive }) =>
                                                    `hover:text-white`
                                                }
                                            >
                                                Tableau de bord admin
                                            </NavLink>
                                            <div className="relative group">
                                                <NavLink
                                                    to="#"
                                                    className={({ isActive }) =>
                                                        `hover:text-white`
                                                    }
                                                >
                                                    Utilisateurs
                                                </NavLink>
                                                <div className="absolute left-0 hidden group-hover:block bg-gray-800 text-white rounded-md shadow-lg">
                                                    <ul className="py-2">
                                                        <li>
                                                            <NavLink
                                                                to="/admin/users/create"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Créer
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to="/admin/users"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Liste
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <NavLink
                                                    to="#"
                                                    className={({ isActive }) =>
                                                        `hover:text-white`
                                                    }
                                                >
                                                    Lieux
                                                </NavLink>
                                                <div className="absolute left-0 hidden group-hover:block bg-gray-800 text-white rounded-md shadow-lg">
                                                    <ul className="py-2">
                                                        <li>
                                                            <NavLink
                                                                to="/admin/lieux/create"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Créer
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to="/admin/lieux"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Liste
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <NavLink
                                                    to="#"
                                                    className={({ isActive }) =>
                                                        `hover:text-white`
                                                    }
                                                >
                                                    Evenements
                                                </NavLink>
                                                <div className="absolute left-0 hidden group-hover:block bg-gray-800 text-white rounded-md shadow-lg">
                                                    <ul className="py-2">
                                                        <li>
                                                            <NavLink
                                                                to="/admin/events/create"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Créer
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to="/admin/events"
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 hover:bg-gray-700}`
                                                                }
                                                            >
                                                                Liste
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </>
                                        
                                    )}
                                    {user.role === 'user' && (
                                        <NavLink
                                            to="/user/dashboard"
                                            className={({ isActive }) =>
                                                `hover:text-white`
                                            }
                                        >
                                            Tableau de bord utilisateur
                                        </NavLink>
                                    )}
                                    <button
                                        className="hover:text-white bg-purple-500 text-white rounded-sm p-2 cursor-pointer"
                                        onClick={logout} 
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex md:hidden">
                    <button className="text-purple-500 hover:text-white">Menu</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
