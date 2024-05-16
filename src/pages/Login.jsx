import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { login } from '../Api/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            console.log('Login successful:', response);

            // Extract token and role from the response
            const token = response.accessToken;  // Update this based on actual response structure
            const role = response.role;  // Ensure this matches the structure of your response

            if (!token || !role) {
                throw new Error('Token or role is missing in the response');
            }

            // Save token and role using AuthProvider's login method
            authLogin(token, role);

            // Redirect to the workouts page if the role is 'PT'
            if (role === 'PT') {
                navigate('/workouts');
            } else {
                // Handle other roles or scenarios if necessary
                console.log('Role is not PT:', role);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
