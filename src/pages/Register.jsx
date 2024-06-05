import React, { useState, useEffect } from 'react';
import { register, checkUsername } from '../Api/AuthService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const role = 'user';  // Fixed role

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) setUsername(savedUsername);
    }, []);

    const validateForm = async () => {
        const errors = {};

        if (!username) {
            errors.username = 'Username cannot be blank';
        } else if (username.length < 3 || username.length > 50) {
            errors.username = 'Username must be between 3 and 50 characters';
        } else {
            // Check if username is unique
            try {
                const response = await checkUsername(username);
                if (response.data) {
                    errors.username = 'Username is already taken';
                }
            } catch (error) {
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

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Reset previous errors

        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await register(username, email, password, role);
            console.log('Registration successful:', response);
            localStorage.setItem('username', username);
            setSuccess('Registration successful. You can now log in.');
            setError({});
        } catch (error) {
            setError({ general: 'Registration failed. Please try again.' });
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    {error.username && <p style={{ color: 'red' }}>{error.username}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a password"
                        required
                    />
                    {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                </div>
                <button type="submit">Register</button>
                {error.general && <p style={{ color: 'red' }}>{error.general}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
};

export default Register;
