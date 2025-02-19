import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupForm from './pages/auth/SignupForm';
import LoginForm from './pages/auth/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import UsersList from './pages/admin/users/UsersList';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<AdminDashboard />}
                            />
                        }
                    />
                    <Route
                        path="/admin/users/create"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<AdminDashboard />}
                            />
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<UsersList />}
                            />
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
