import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WorkoutPlanForm from '../components/WorkoutPlanForm';

const WorkoutPlanDetailPage = () => {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/workout-plans/${id}`);
                const { workoutPlans, error, errorMessage } = response.data;

                if (!error && workoutPlans.length > 0) {
                    setWorkout(workoutPlans[0]);
                } else {
                    console.error('Error fetching workout:', errorMessage);
                }
            } catch (error) {
                console.error('Error fetching workout:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    const handleDeleteWorkout = async () => {
        try {
            await axios.delete(`http://localhost:8080/workout-plans/${id}`);
            console.log('Workout deleted successfully');
            window.location.href = 'http://localhost:5173';
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleUpdateWorkout = async (updatedWorkout) => {
        try {
            await axios.put(`http://localhost:8080/workout-plans/${id}`, updatedWorkout);
            console.log('Workout updated successfully');
            window.location.href = 'http://localhost:5173';
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };
    

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : workout ? (
                <div>
                    <h1>Workout Details</h1>
                    <p>Workout ID: {workout.id}</p>
                    <p>Name: {workout.name}</p>
                    <p>Description: {workout.description}</p>
                    <p>Duration (in days): {workout.durationInDays}</p>
                    <h2>Exercises</h2>
                    <ul>
                        {workout.exercises.map(exercise => (
                            <li key={exercise.id}>
                                <p>Name: {exercise.name}</p>
                                <p>Description: {exercise.description}</p>
                                <p>Duration (in minutes): {exercise.durationInMinutes}</p>
                                <p>Muscle Group: {exercise.muscleGroup}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleDeleteWorkout}>Delete Workout</button>
                    <WorkoutPlanForm
                        initialData={workout} 
                        onSubmit={handleUpdateWorkout} 
                        mode="update" // Pass the mode prop
                        submitButtonLabel="Update Workout"
                    />


                </div>
            ) : (
                <p>Workout not found</p>
            )}
        </div>
    );
};

export default WorkoutPlanDetailPage;