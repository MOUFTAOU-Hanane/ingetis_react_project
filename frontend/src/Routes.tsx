import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupForm from './pages/auth/SignupForm';

const AppRoutes = () => {
return (
    <Router>
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/register"
                element={<SignupForm />}
            />
        </Routes>
    </Router>
);
};

export default AppRoutes;
