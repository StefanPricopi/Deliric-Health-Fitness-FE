import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    console.log("Navbar rendered with token:", token);

    return (
        <nav className="navbar">
            <h1>Delirium Health & Fitness</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {token && (
                    <Link to="/workouts">Workouts</Link>
                )}
                {!token && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                {token && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
