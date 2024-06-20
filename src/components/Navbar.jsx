import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import logo from '../assets/logo.png'; // Make sure the path to your logo image is correct
import './Navbar.css'; // Ensure you have a separate CSS file for Navbar styling

const Navbar = () => {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Delirium Health & Fitness Logo" className="logo" />
            <div className="links">
                <Link to="/">Home</Link>
                {token ? (
                    <>
                        <Link to="/workouts">Workouts</Link>
                        {role === 'PT' && <Link to="/dashboard">Dashboard</Link>}
                        <Link to="/pts">PTs</Link>
                        <button className='logout-button' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
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
