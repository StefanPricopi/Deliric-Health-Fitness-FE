import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, checkUsername } from '../Api/AuthService';
import Navbar from '../components/Navbar';
import signupPageBackground from '../assets/signupPageBackground.jpg';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const role = 'user';  

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) setUsername(savedUsername);
    }, []);

    const validateForm = async () => {
        const errors = {};

        console.log('Validating form...');

        if (!username) {
            errors.username = 'Username cannot be blank';
        } else if (username.length < 3 || username.length > 50) {
            errors.username = 'Username must be between 3 and 50 characters';
        } else {
            // Check if username is unique
            try {
                console.log('Checking if username is unique:', username);
                const response = await checkUsername(username);
                console.log('Username check response:', response);
                if (response.data) {
                    errors.username = 'Username is already taken';
                }
            } catch (error) {
                console.error('Error checking username:', error);
                errors.username = 'This username is already taken, please try another one';
            }
        }

        if (!email) {
            errors.email = 'Email cannot be blank';
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                errors.email = 'Email should be valid';
            }
        }

        if (!password) {
            errors.password = 'Password cannot be blank';
        } else {
            const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
            if (password.length < 8) {
                errors.password = 'Password must be at least 8 characters long';
            } else if (!passwordPattern.test(password)) {
                errors.password = 'Password must contain at least one digit, one lowercase character, one uppercase character, one special symbol (@#$%^&+=), and no whitespace.';
            }
        }

        console.log('Validation errors:', errors);
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Reset previous errors

        console.log('Handling form submission...');

        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            setError(errors);
            console.log('Form validation failed:', errors);
            return;
        }

        try {
            console.log('Registering user with:', { username, email, password, role });
            const response = await register(username, email, password, role);
            console.log('Registration successful:', response);
            localStorage.setItem('username', username);
            setSuccess('Registration successful. You can now log in.');
            setError({});
        } catch (error) {
            console.error('Registration failed:', error);
            setError({ general: 'Registration failed. Please try again.' });
            setSuccess('');
        }
    };

    return (
        <div className="register-page" style={{ backgroundImage: `url(${signupPageBackground})` }}>
            <Navbar />
            <div className="register-form-wrapper">
                <div className="register-form-container">
                    <h2>Register</h2>
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
                            {error.username && <p className="error">{error.username}</p>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            {error.email && <p className="error">{error.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a password"
                                required
                            />
                            {error.password && <p className="error">{error.password}</p>}
                        </div>
                        <button type="submit">Register</button>
                        {error.general && <p className="error">{error.general}</p>}
                        {success && <p className="success">{success}</p>}
                    </form>
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default Register;
