import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-purple-500">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex">
                    <span className="text-xl font-bold">Event Master</span>
                    <div>
                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `hover:text-white ${isActive ? "text-white" : ""}`
                                }
                            >
                                S'inscrire
                            </NavLink>
                        </div>
                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `hover:text-white ${isActive ? "text-white" : ""}`
                                }
                            >
                                Se connecter
                            </NavLink>
                        </div>
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
