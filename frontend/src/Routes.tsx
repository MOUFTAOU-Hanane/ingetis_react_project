import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import UsersList from "./pages/admin/users/UsersList";
import CreateUser from "./pages/admin/users/CreateUser";
import LieuxList from "./pages/admin/lieux/LieuxList";
import CreateLieu from "./pages/admin/lieux/CreateLieu";
import AddParcours from "./pages/admin/parcours/AddParcours";
import ParcoursList from "./pages/admin/parcours/ParcoursList";
import EventsList from "./pages/events/EventList";
import CreateEvent from "./pages/events/CreateEvent";
import EventPrograms from "./pages/events/programs/EventPrograms";
import EventCatalogs from "./pages/events/catalogs/EventCatalogs";
import EventMedias from "./pages/events/medias/EventMedias";
import OeuvresList from "./pages/oeuvres/OeuvresList";
import CreateOeuvre from "./pages/oeuvres/CreateOeuvre";
import EventsPage from "./pages/client/events/EventsPage";
import OeuvresPage from "./pages/client/oeuvres/OeuvresPage";
import EventDetails from "./pages/client/events/EventDetails";
import ClientDashboard from "./pages/client/dashboard/ClientDashboard";
import OrganisateurDashboard from "./pages/organisateur/dashboard/OrganisateurDashboard";

// Définition stricte des rôles
const ROLES = {
    ADMIN: "admin",
    ORGANISATEUR: "organisateur",
    USER: "user",
} as const;

// type Role = keyof typeof ROLES;

type AppRoute = {
    path: string;
    element: any;
    allowedRoles?: (typeof ROLES)[keyof typeof ROLES][];
};

const routes: AppRoute[] = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <SignupForm /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/admin/dashboard", element: <AdminDashboard />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/users", element: <UsersList />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/users/create", element: <CreateUser />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/lieux", element: <LieuxList />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/lieux/create", element: <CreateLieu />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/lieux/update/:id", element: <CreateLieu />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/lieux/:id/parcours/create", element: <AddParcours />, allowedRoles: [ROLES.ADMIN] },
    { path: "/admin/lieux/:id/parcours", element: <ParcoursList />, allowedRoles: [ROLES.ADMIN] },
    { path: "/events", element: <EventsList />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/events/create", element: <CreateEvent />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/events/update/:id", element: <CreateEvent />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/events/:id/programs", element: <EventPrograms />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/events/:id/catalogs", element: <EventCatalogs />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/events/:id/medias", element: <EventMedias />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/oeuvres", element: <OeuvresList />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/oeuvres/create", element: <CreateOeuvre />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/oeuvres/update/:id", element: <CreateOeuvre />, allowedRoles: [ROLES.ADMIN, ROLES.ORGANISATEUR] },
    { path: "/user/events", element: <EventsPage />, allowedRoles: [ROLES.USER] },
    { path: "/user/dashboard", element: <ClientDashboard />, allowedRoles: [ROLES.USER] },
    { path: "/organisateur/dashboard", element: <OrganisateurDashboard />, allowedRoles: [ROLES.ORGANISATEUR] },
    { path: "/user/events/:id", element: <EventDetails />, allowedRoles: [ROLES.USER] },
    { path: "/user/oeuvres", element: <OeuvresPage />, allowedRoles: [ROLES.USER] },
];

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {routes.map(({ path, element, allowedRoles }, index) => (
                        <Route
                            key={index}
                            path={path}
                            element={
                                allowedRoles ? (
                                    <PrivateRoute allowedRoles={allowedRoles} element={element} />
                                ) : (
                                    element
                                )
                            }
                        />
                    ))}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
