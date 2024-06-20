// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/AuthService';
import './LoginForm.css'; 

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required');
            console.log('Error: All fields are required'); 
            return;
        }
        try {
            const response = await login(username, password);
            if (response.accessToken) {
                localStorage.setItem('token', response.accessToken);
                navigate('/workouts');
            } else {
                setError('Invalid username or password');
                console.log('Error: Invalid username or password'); 
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.log('Error: Login failed. Please try again.'); 
        }
    };

    console.log('Rendering Login Component'); 

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
