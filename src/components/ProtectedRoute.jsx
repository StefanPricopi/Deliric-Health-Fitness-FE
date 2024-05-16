import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        console.log("No token found, redirecting to login");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
