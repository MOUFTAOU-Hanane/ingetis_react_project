import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    allowedRoles: ('admin' | 'user' | 'organisateur')[];
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, element }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirige vers /login si l'utilisateur n'est pas connecté
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirige vers / si l'utilisateur n'a pas le rôle nécessaire
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Si tout est OK, on retourne l'élément demandé
    return <>{element}</>;
};

export default PrivateRoute;
