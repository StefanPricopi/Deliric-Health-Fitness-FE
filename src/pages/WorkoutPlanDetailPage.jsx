import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutPlanService from '../Api/WorkoutPlanService';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import ExerciseService from '../Api/ExerciseService';

const WorkoutPlanDetailPage = () => {
    const { id } = useParams();
    const [workout, setWorkout] = useState({ exercises: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedWorkout = await WorkoutPlanService.fetchWorkout(id);
                setWorkout({ ...fetchedWorkout, exercises: fetchedWorkout.exercises || [] });
            } catch (error) {
                console.error('Error fetching workout data:', error);
                setWorkout(null);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleAddExercise = async (newExercise) => {
        // Add the new exercise to the current workout plan
        const updatedWorkout = { ...workout };
        updatedWorkout.exercises.push(newExercise);
        setWorkout(updatedWorkout);
    
        // Save the updated workout plan to the database
        await handleUpdateWorkout(updatedWorkout);
    };
    

    const handleDeleteWorkout = async () => {
        const success = await WorkoutPlanService.deleteWorkout(id);
        if (success) {
            window.location.href = 'http://localhost:5173';
        }
    };

    const handleUpdateWorkout = async (updatedWorkout) => {
        console.log('Updated Workout:', updatedWorkout);
    
        const success = await WorkoutPlanService.updateWorkout(id, updatedWorkout);
        if (success) {
            window.location.href = 'http://localhost:5173';
        }
    };
    

    const handleRemoveExercise = async (exerciseId) => {
        const success = await ExerciseService.deleteExercise(exerciseId);
        if (success) {
          
          const updatedExercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
          setWorkout({ ...workout, exercises: updatedExercises });
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
            <h2>Exercises</h2>
            <ul>
                {workout.exercises.map(exercise => (
                    <li key={exercise.id}>
                        <p>Name: {exercise.name}</p>
                        <p>Description: {exercise.description}</p>
                        <p>Duration (in minutes): {exercise.durationInMinutes}</p>
                        <p>Muscle Group: {exercise.muscleGroup}</p>
                        <button onClick={() => handleRemoveExercise(exercise.id)}>Remove Exercise</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleDeleteWorkout}>Delete Workout</button>
                    <WorkoutPlanForm
            initialData={workout}
            onSubmit={handleUpdateWorkout}
            onAddExercise={handleAddExercise} 
            mode="update"
            submitButtonLabel="Update Workout"
        />

        </div>
    );
};

export default WorkoutPlanDetailPage;
