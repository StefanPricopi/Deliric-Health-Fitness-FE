import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
    const { token, role, logout } = useAuth();
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
                    <>
                        <Link to="/workouts">Workouts</Link>
                        {role === 'PT' && <Link to="/dashboard">Dashboard</Link>}
                        <Link to="/pts">PTs</Link>  {/* Add the link to PTsPage */}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
                {!token && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
