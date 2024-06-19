import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/AuthService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required');
            console.log('Error: All fields are required'); // Debug log
            return;
        }
        try {
            const response = await login(username, password);
            if (response.accessToken) {
                localStorage.setItem('token', response.accessToken);
                navigate('/workouts');
            } else {
                setError('Invalid username or password');
                console.log('Error: Invalid username or password'); // Debug log
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.log('Error: Login failed. Please try again.'); // Debug log
        }
    };

    console.log('Rendering Login Component'); // Debug log

    return (
        <div className="login-page">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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

export default Login;
