import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-purple-500">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex w-full justify-between">
                    <span className="text-xl font-bold flex items-center">Event Master</span>
                    <div className="flex gap-4 !items-center">
                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `hover:text-white ${isActive ? "text-white" : ""}`
                                }
                            >
                                Se connecter
                            </NavLink>
                        </div>
                        <div className="hidden md:flex space-x-4 text-white p-2.5 rounded-lg bg-purple-500">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `hover:text-white ${isActive ? "text-white" : ""}`
                                }
                            >
                                S'inscrire
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
