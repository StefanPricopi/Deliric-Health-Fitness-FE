export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/users/login', {
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
    return {
        accessToken: data.accessToken,  // Ensure this matches the actual response structure
        role: data.role,  // Ensure this matches the actual response structure
    };
};

export const register = async (username, email, password) => {
    const response = await fetch('http://localhost:8080/users/register', {
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
let token = null;

export const setToken = newToken => {
    token = newToken;
};

export const getToken = () => token;






