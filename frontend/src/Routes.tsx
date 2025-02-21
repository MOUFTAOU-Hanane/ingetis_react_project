import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupForm from './pages/auth/SignupForm';
import LoginForm from './pages/auth/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import UsersList from './pages/admin/users/UsersList';
import CreateUser from './pages/admin/users/CreateUser';
import LieuxList from './pages/admin/lieux/LieuxList';
import CreateLieu from './pages/admin/lieux/CreateLieu';
import AddParcours from './pages/admin/parcours/AddParcours';
import ParcoursList from './pages/admin/parcours/ParcoursList';
import EventsList from './pages/events/EventList';
import CreateEvent from './pages/events/CreateEvent';
import EventPrograms from './pages/events/programs/EventPrograms';

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
                        path="/admin/users"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<UsersList />}
                            />
                        }
                    />
                    <Route
                        path="/admin/users/create"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<CreateUser />}
                            />
                        }
                    />
                    <Route
                        path="/admin/lieux"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<LieuxList />}
                            />
                        }
                    />
                    <Route
                        path="/admin/lieux/create"
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<CreateLieu />}
                            />
                        }
                    />
                    <Route
                        path="/admin/lieux/update/:id" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<CreateLieu />} 
                            />
                        }
                    />
                    <Route
                        path="/admin/lieux/:id/parcours/create" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<AddParcours />} 
                            />
                        }
                    />
                    <Route
                        path="/admin/lieux/:id/parcours" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<ParcoursList />} 
                            />
                        }
                    />
                    <Route
                        path="/events/create" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<CreateEvent />} 
                            />
                        }
                    />
                    <Route
                        path="/events/update/:id" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<CreateEvent />} 
                            />
                        }
                    />
                    <Route
                        path="/events" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<EventsList />} 
                            />
                        }
                    />
                    <Route
                        path="/events/:id/programs" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<EventPrograms />} 
                            />
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
