import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import WorkoutPlanService from '../Api/WorkoutPlanService';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import ExerciseService from '../Api/ExerciseService';
import Navbar from '../components/Navbar';
import './WorkoutPlanDetailPage.css';

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
        try {
            const updatedWorkout = { ...workout };
            updatedWorkout.exercises.push(newExercise);
            setWorkout(updatedWorkout);
            await handleUpdateWorkout(updatedWorkout);
        } catch (error) {
            alert('Sorry, you are not allowed to change this information.');
        }
    };

    const handleDeleteWorkout = async () => {
        try {
            const confirmation = window.confirm("Are you sure you want to delete this workout?");
            if (confirmation) {
                const success = await WorkoutPlanService.deleteWorkout(id);
                if (success) {
                    window.location.href = '/';
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Sorry, you are not allowed to change this information.');
            } else {
                console.error('Error deleting workout:', error);
                alert('An error occurred while deleting the workout.');
            }
        }
    };

    const handleUpdateWorkout = async (updatedWorkout) => {
        try {
            console.log('Updated Workout:', updatedWorkout);
            const success = await WorkoutPlanService.updateWorkout(id, updatedWorkout);
            if (success) {
                window.location.href = '/';
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Sorry, you are not allowed to change this information.');
            } else {
                console.error('Error updating workout:', error);
                alert('An error occurred while updating the workout.');
            }
        }
    };

    const handleRemoveExercise = async (exerciseId) => {
        try {
            const confirmation = window.confirm("Are you sure you want to remove this exercise?");
            if (confirmation) {
                const success = await ExerciseService.deleteExercise(exerciseId);
                if (success) {
                    const updatedExercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
                    setWorkout({ ...workout, exercises: updatedExercises });
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Sorry, you are not allowed to change this information.');
            } else {
                console.error('Error removing exercise:', error);
                alert('An error occurred while removing the exercise.');
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
        <div className="workout-detail-page">
            <Navbar />
            <div className="content-wrapper">
                <div className="workout-card">
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
                                    <button className="remove-exercise-button" onClick={() => handleRemoveExercise(exercise.id)}>Remove Exercise</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {role === 'PT' && (
                        <>
                            <button className="delete-workout-button" onClick={handleDeleteWorkout}>Delete Workout</button>
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
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default WorkoutPlanDetailPage;
