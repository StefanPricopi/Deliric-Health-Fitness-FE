import React, { createContext, useContext, useState, useEffect } from 'react';
import { setToken } from '../Api/AuthService'; // Import the setToken function

const AuthContext = createContext({ token: undefined, role: undefined, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: sessionStorage.getItem('token') || undefined,
        role: sessionStorage.getItem('role') || undefined,
    });

    useEffect(() => {
        console.log("Auth state initialized:", authState);
        if (authState.token) {
            setToken(authState.token); // Set the token in the AuthService
        }
    }, []);

    useEffect(() => {
        console.log("Auth state updated:", authState);
        sessionStorage.setItem('token', authState.token);
        sessionStorage.setItem('role', authState.role);
        if (authState.token) {
            setToken(authState.token); // Set the token in the AuthService
        }
    }, [authState]);

    const login = (token, role) => {
        console.log("Login function called with token:", token);
        setAuthState({ token, role });
    };

    const logout = () => {
        console.log("Logout function triggered");
        setAuthState({ token: undefined, role: undefined });
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext }; // Ensure this is exported
