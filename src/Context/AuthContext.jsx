import React, { createContext, useContext, useState, useEffect } from 'react';
import { setToken, decodeToken } from '../Api/AuthService';

const AuthContext = createContext({ token: undefined, user: undefined, role: undefined, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: sessionStorage.getItem('token') || undefined,
        user: sessionStorage.getItem('token') ? decodeToken(sessionStorage.getItem('token')) : undefined,
        role: sessionStorage.getItem('role') || undefined,
    });

    useEffect(() => {
        console.log("Auth state initialized:", authState);
        if (authState.token) {
            setToken(authState.token);
            const user = decodeToken(authState.token);
            setAuthState(prevState => ({ ...prevState, user }));
        }
    }, []);

    useEffect(() => {
        console.log("Auth state updated:", authState);
        sessionStorage.setItem('token', authState.token);
        sessionStorage.setItem('role', authState.role);
        if (authState.token) {
            setToken(authState.token);
            const user = decodeToken(authState.token);
            setAuthState(prevState => ({ ...prevState, user }));
        }
    }, [authState.token]);

    const login = (token, role) => {
        console.log("Login function called with token:", token);
        const user = decodeToken(token);
        setAuthState({ token, user, role });
    };

    const logout = () => {
        console.log("Logout function triggered");
        setAuthState({ token: undefined, user: undefined, role: undefined });
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
