import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-purple-500">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">Event Master</span>
                    <div className="hidden md:flex space-x-4">
                        <NavLink
                        to="/user"
                        className={({ isActive }) =>
                            `hover:text-white ${isActive ? "text-white" : ""}`
                        }
                        >
                        Utilisateurs
                        </NavLink>
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
