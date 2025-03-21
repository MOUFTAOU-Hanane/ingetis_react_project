// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IUser } from '../interfaces';

interface AuthContextType {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // console.log({sessionStorage})
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (user: IUser) => {
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user)); 
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user'); 
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


    // Custom hook pour utiliser le contexte Auth
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
