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

export const getAllPTs = async () => {
    try {
        const response = await api.get('/users/pts', getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error fetching all PTs:', error);
    }
};

export const subscribe = async (userId, ptId) => {
    try {
        const response = await api.post('/subscriptions/subscribe', { userId, ptId }, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error subscribing to PT:', error);
    }
};

export const unsubscribe = async (userId, ptId) => {
    try {
        const response = await api.post('/subscriptions/unsubscribe', { userId, ptId }, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error unsubscribing from PT:', error);
    }
};

export const getWorkoutCountsByUser = async () => {
    try {
        const response = await api.get('/workout-plans/counts-by-user', getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error fetching workout counts by user:', error);
    }
};

export const getUserSubscriptions = async (userId) => {
    try {
        const response = await api.get(`/subscriptions/list?userId=${userId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user subscriptions:', error);
    }
};
