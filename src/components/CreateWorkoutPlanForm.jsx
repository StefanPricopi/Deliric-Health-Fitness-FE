import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

// Function to decode JWT without using a library
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Invalid token', e);
        return null;
    }
};

const CreateWorkoutPlanForm = ({ onSubmit, visible }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [durationInDays, setDurationInDays] = useState('');
    const [errors, setErrors] = useState({});
    const { token } = useContext(AuthContext);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Workout name is required';
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!durationInDays || durationInDays <= 0) {
            newErrors.durationInDays = 'Duration must be greater than 0';
        }
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const confirmation = window.confirm("Are you sure you want to add a new workout?");
        if (confirmation) {
            console.log("Retrieved token:", token); // Log the token for debugging
            if (token) {
                const decodedToken = parseJwt(token);
                if (decodedToken) {
                    console.log("Decoded token:", decodedToken); // Log the decoded token
                    const userId = decodedToken.userId; // Ensure your token includes userId
                    if (userId) {
                        console.log("User ID found in token:", userId); // Log the user ID
                        onSubmit({
                            name,
                            description,
                            durationInDays: parseInt(durationInDays, 10),
                            userId
                        });
                        setName('');
                        setDescription('');
                        setDurationInDays('');
                        setErrors({});
                    } else {
                        console.error("User ID not found in token"); // Log if user ID is not found
                        alert('User ID not found in token');
                    }
                } else {
                    console.error("Invalid token"); // Log invalid token case
                    alert('Invalid token');
                }
            } else {
                // Handle the case where the token is not found
                console.error("User is not authenticated - Token not found"); // Log if token is not found
                alert('User is not authenticated');
            }
        }
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setDurationInDays('');
        setErrors({});
    };

    if (!visible) {
        return null;
    }

    return (
        <div>
            <h2>Add Workout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Workout Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="durationInDays">Duration (Days):</label>
                    <input
                        id="durationInDays"
                        type="number"
                        value={durationInDays}
                        onChange={(e) => setDurationInDays(e.target.value)}
                        required
                    />
                    {errors.durationInDays && <p style={{ color: 'red' }}>{errors.durationInDays}</p>}
                </div>
                <button type="submit">Create Workout</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateWorkoutPlanForm;
