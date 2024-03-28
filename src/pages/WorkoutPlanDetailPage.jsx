// WorkoutPlanDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutPlanService from '../Api/WorkoutPlanService'; 
import WorkoutPlanForm from '../components/WorkoutPlanForm';

const WorkoutPlanDetailPage = () => {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedWorkout = await WorkoutPlanService.fetchWorkout(id); 
            setWorkout(fetchedWorkout);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleDeleteWorkout = async () => {
        const success = await WorkoutPlanService.deleteWorkout(id); 
        if (success) {
            window.location.href = 'http://localhost:5173';
        }
    };

    const handleUpdateWorkout = async (updatedWorkout) => {
        const success = await WorkoutPlanService.updateWorkout(id, updatedWorkout); 
        if (success) {
            window.location.href = 'http://localhost:5173';
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
                        mode="update" 
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
