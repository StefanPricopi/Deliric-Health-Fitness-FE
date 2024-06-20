import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { login } from '../Api/AuthService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import loginPageBackground from '../assets/loginPageBackground.jpg';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await login(username, password);
            console.log('Login successful:', response);

            // Extract token and role from the response
            const token = response.accessToken;  
            const role = response.role;  

            if (!token || !role) {
                throw new Error('Token or role is missing in the response');
            }

            authLogin(token, role);

            if (role === 'PT') {
                navigate('/workouts');
            } else {
                console.log('Role is not PT:', role);
            }
            setError('');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${loginPageBackground})` }}>
            <Navbar />
            <div className="login-form-wrapper">
                <div className="login-form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default Login;
