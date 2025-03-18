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
import EventCatalogs from './pages/events/catalogs/EventCatalogs';
import EventMedias from './pages/events/medias/EventMedias';
import OeuvresList from './pages/oeuvres/OeuvresList';
import CreateOeuvre from './pages/oeuvres/CreateOeuvre';
import EventsPage from './pages/client/events/EventsPage';
import OeuvresPage from './pages/client/oeuvres/OeuvresPage';
import EventDetails from './pages/client/events/EventDetails';
import ClientDashboard from './pages/client/dashboard/ClientDashboard';

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
                                allowedRoles={['admin']}
                                element={<EventsList />} 
                            />
                        }
                    />
                    <Route
                        path="/events/:id/programs" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<EventPrograms />} 
                            />
                        }
                    />
                    <Route
                        path="/events/:id/catalogs" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<EventCatalogs />} 
                            />
                        }
                    />
                    <Route
                        path="/events/:id/medias" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<EventMedias />} 
                            />
                        }
                    />
                    <Route
                        path="/oeuvres" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin']}
                                element={<OeuvresList />} 
                            />
                        }
                    />
                    <Route
                        path="/oeuvres/create" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<CreateOeuvre />} 
                            />
                        }
                    />
                    <Route
                        path="/oeuvres/update/:id" 
                        element={
                            <PrivateRoute
                                allowedRoles={['admin', 'user']}
                                element={<CreateOeuvre />} 
                            />
                        }
                    />
                    <Route
                        path="/user/events" 
                        element={
                            <PrivateRoute
                                allowedRoles={['user']}
                                element={<EventsPage />} 
                            />
                        }
                    />
                    <Route
                        path="/user/dashboard" 
                        element={
                            <PrivateRoute
                                allowedRoles={['user']}
                                element={<ClientDashboard />} 
                            />
                        }
                    />
                    <Route
                        path="/user/events/:id" 
                        element={
                            <PrivateRoute
                                allowedRoles={['user']}
                                element={<EventDetails />} 
                            />
                        }
                    />
                    <Route
                        path="/user/oeuvres" 
                        element={
                            <PrivateRoute
                                allowedRoles={['user']}
                                element={<OeuvresPage />} 
                            />
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
