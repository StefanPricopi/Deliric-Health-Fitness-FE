import axios from 'axios';
import { getToken } from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

const baseURL = '/workout-plans';

const getAuthHeaders = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const WorkoutPlanService = {
    getAllWorkoutPlans: async () => {
        try {
            const response = await api.get(baseURL, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw new Error('Error fetching workout plans:', error);
        }
    },
    getWorkoutPlansByPT: async (ptId) => {
        try {
            const response = await api.get(`${baseURL}/by-pt/${ptId}`, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw new Error('Error fetching workout plans by PT:', error);
        }
    },
    addWorkoutPlan: async (newWorkoutPlan) => {
        try {
            const response = await api.post(baseURL, newWorkoutPlan, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw new Error('Error adding workout plan:', error);
        }
    },
    fetchWorkout: async (id) => {
        try {
            const response = await api.get(`${baseURL}/${id}`, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw new Error('Error fetching workout:', error);
        }
    },
    deleteWorkout: async (id) => {
        try {
            await api.delete(`${baseURL}/${id}`, getAuthHeaders());
            return true;
        } catch (error) {
            console.error('Error deleting workout:', error);
            return false;
        }
    },
    updateWorkout: async (id, updatedWorkout) => {
        try {
            await api.put(`${baseURL}/${id}`, updatedWorkout, getAuthHeaders());
            return true;
        } catch (error) {
            console.error('Error updating workout:', error);
            return false;
        }
    }
};

export default WorkoutPlanService;
