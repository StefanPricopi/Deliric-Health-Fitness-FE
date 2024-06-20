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
    return axios.get(`${API_URL}/check-username`, { params: { username } });
};

const base64UrlToJson = (base64Url) => {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const payload = base64UrlToJson(base64Url);
        return {
            subject: payload.sub,
            userId: payload.userId,
            roles: payload.roles,
        };
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
