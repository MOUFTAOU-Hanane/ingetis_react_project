import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-purple-500">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">Gestion App</span>
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/user"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Utilisateurs
            </NavLink>
            <NavLink
              to="/lieux"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Lieux
            </NavLink>
            <NavLink
              to="/parcours"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Parcours
            </NavLink>
            <NavLink
              to="/event"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Événements
            </NavLink>
            <NavLink
              to="/program"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Programmes
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Catalogue
            </NavLink>
            <NavLink
              to="/oeuvre"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Œuvres
            </NavLink>
            <NavLink
              to="/media"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Médias
            </NavLink>
            <NavLink
              to="/comment"
              className={({ isActive }) => `hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              Commentaires
            </NavLink>
          </div>
        </div>
        <div className="flex md:hidden">
          <button className="text-purple-500 hover:text-white">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
