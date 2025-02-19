// src/components/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    allowedRoles: ('admin' | 'user')[];
    element: React.ReactNode;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, element, path }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Si l'utilisateur n'est pas connecté, on le redirige vers /login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Si l'utilisateur n'a pas le rôle nécessaire, on le redirige vers /
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Si tout est OK, on rend la route demandée
    return <Route path={path} element={element} />;
};

export default PrivateRoute;
