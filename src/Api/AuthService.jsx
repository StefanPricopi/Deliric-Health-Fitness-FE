
import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

let token = null;

export const setToken = newToken => {
    token = newToken;
    localStorage.setItem('token', newToken);
};

export const getToken = () => {
    if (!token) {
        token = localStorage.getItem('token');
    }
    return token;
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data = await response.json();
    setToken(data.accessToken);  // Store token
    return {
        accessToken: data.accessToken,
        role: data.role,
    };
};

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, roles: "user" }),
    });
    if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
    }
    return await response.json();
};

export const getAllPTs = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/pts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};


export const checkUsername = (username) => {
    return axios.get('/api/check-username', { params: { username } });
};




