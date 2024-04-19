import axios from 'axios';

const baseURL = 'http://localhost:8080/workout-plans';

const WorkoutPlanService = {
    getAllWorkoutPlans: async () => {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching workout plans:', error);
        }
    },
    addWorkoutPlan: async (newWorkoutPlan) => {
        try {
            const response = await axios.post(baseURL, newWorkoutPlan);
            return response.data;
        } catch (error) {
            throw new Error('Error adding workout plan:', error);
        }
    },
    fetchWorkout: async (id) => {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            const { workoutPlans, error, errorMessage } = response.data;

            if (!error && workoutPlans.length > 0) {
                return workoutPlans[0];
            } else {
                console.error('Error fetching workout:', errorMessage);
                return null;
            }
        } catch (error) {
            console.error('Error fetching workout:', error);
            return null;
        }
    },

    deleteWorkout: async (id) => {
        try {
            await axios.delete(`${baseURL}/${id}`);
            console.log('Workout deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting workout:', error);
            return false;
        }
    },
     

    updateWorkout: async (id, updatedWorkout) => {
        try {
            await axios.put(`${baseURL}/${id}`, updatedWorkout);
            console.log('Workout updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating workout:', error);
            return false;
        }
    },
};

export default WorkoutPlanService;
