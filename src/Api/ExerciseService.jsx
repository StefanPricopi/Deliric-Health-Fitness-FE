import axios from 'axios';

const baseURL = 'http://localhost:8080/exercises';

const ExerciseService = {
  deleteExercise: async (exerciseId) => {
    try {
      await axios.delete(`${baseURL}/${exerciseId}`);
      console.log('Exercise deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      return false;
    }
  },

}

export default ExerciseService;