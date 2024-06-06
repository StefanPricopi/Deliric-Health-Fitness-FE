
import axios from 'axios';
import { getToken } from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

const getAuthHeaders = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getWorkoutCountsByUser = async (token) => {
    try {
        const response = await api.get('/workout-plans/counts-by-user', getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error fetching workout counts by user:', error);
    }
};
