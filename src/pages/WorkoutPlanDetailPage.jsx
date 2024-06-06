import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import WorkoutPlanService from '../Api/WorkoutPlanService';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import ExerciseService from '../Api/ExerciseService';

const WorkoutPlanDetailPage = () => {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching workout with id:", id);
                const fetchedWorkout = await WorkoutPlanService.fetchWorkout(id);
                console.log("Fetched workout data:", fetchedWorkout);
                if (fetchedWorkout && !fetchedWorkout.error) {
                    setWorkout(fetchedWorkout.workoutPlans[0]);
                } else {
                    console.error("Error:", fetchedWorkout.errorMessage);
                    setWorkout(null);
                }
            } catch (error) {
                console.error('Error fetching workout data:', error);
                setWorkout(null);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleAddExercise = async (newExercise) => {
        const updatedWorkout = { ...workout };
        updatedWorkout.exercises.push(newExercise);
        setWorkout(updatedWorkout);
        await handleUpdateWorkout(updatedWorkout);
    };

    const handleDeleteWorkout = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this workout?");
        if (confirmation) {
            const success = await WorkoutPlanService.deleteWorkout(id);
            if (success) {
                window.location.href = '/';
            }
        }
    };

    const handleUpdateWorkout = async (updatedWorkout) => {
        console.log('Updated Workout:', updatedWorkout);
        const success = await WorkoutPlanService.updateWorkout(id, updatedWorkout);
        if (success) {
            window.location.href = '/';
        }
    };

    const handleRemoveExercise = async (exerciseId) => {
        const confirmation = window.confirm("Are you sure you want to remove this exercise?");
        if (confirmation) {
            const success = await ExerciseService.deleteExercise(exerciseId);
            if (success) {
                const updatedExercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
                setWorkout({ ...workout, exercises: updatedExercises });
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!workout) {
        return <p>Workout not found</p>;
    }

    return (
        <div>
            <h1>Workout Details</h1>
            <p>Workout ID: {workout.id}</p>
            <p>Name: {workout.name}</p>
            <p>Description: {workout.description}</p>
            <p>Duration (in days): {workout.durationInDays}</p>
            {workout.user && <p>Posted by: {workout.user.username}</p>}
            <h2>Exercises</h2>
            <ul>
                {workout.exercises.map(exercise => (
                    <li key={exercise.id}>
                        <p>Name: {exercise.name}</p>
                        <p>Description: {exercise.description}</p>
                        <p>Duration (in minutes): {exercise.durationInMinutes}</p>
                        <p>Muscle Group: {exercise.muscleGroup}</p>
                        {role === 'PT' && (
                            <button onClick={() => handleRemoveExercise(exercise.id)}>Remove Exercise</button>
                        )}
                    </li>
                ))}
            </ul>
            {role === 'PT' && (
                <>
                    <button onClick={handleDeleteWorkout}>Delete Workout</button>
                    <WorkoutPlanForm
                        initialData={workout}
                        onSubmit={handleUpdateWorkout}
                        onAddExercise={handleAddExercise}
                        isUpdate={true}
                        visible={role === 'PT'}
                    />
                </>
            )}
        </div>
    );
};

export default WorkoutPlanDetailPage;
