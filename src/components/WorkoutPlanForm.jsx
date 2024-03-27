import React, { useState, useEffect } from 'react';

const WorkoutPlanForm = ({ onSubmit, initialData, isUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [durationInDays, setDurationInDays] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [exerciseDurationInMinutes, setExerciseDurationInMinutes] = useState(0);
    const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setDurationInDays(initialData.durationInDays || 0);
            setExercises(initialData.exercises || []);
        }
    }, [initialData]);

    const addExercise = () => {
        const newExercise = {
            name: exerciseName,
            description: exerciseDescription,
            durationInMinutes: exerciseDurationInMinutes,
            muscleGroup: exerciseMuscleGroup
        };
        setExercises([...exercises, newExercise]);
        setExerciseName('');
        setExerciseDescription('');
        setExerciseDurationInMinutes(0);
        setExerciseMuscleGroup('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const workoutPlan = { name, description, durationInDays, exercises };
        if (isUpdate) {
            onSubmit(workoutPlan);
        } else {
            onSubmit(workoutPlan);
        }
    };
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Workout Plan Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <textarea
                placeholder="Workout Plan Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Duration in Days"
                value={durationInDays}
                onChange={e => setDurationInDays(parseInt(e.target.value))}
            />
            <div>
                <h3>Add Exercise</h3>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={e => setExerciseName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Exercise Description"
                    value={exerciseDescription}
                    onChange={e => setExerciseDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Duration in Minutes"
                    value={exerciseDurationInMinutes}
                    onChange={e => setExerciseDurationInMinutes(parseInt(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Muscle Group"
                    value={exerciseMuscleGroup}
                    onChange={e => setExerciseMuscleGroup(e.target.value)}
                />
                <button type="button" onClick={addExercise}>Add Exercise</button>
            </div>
            {exercises.length > 0 && (
                <div>
                    <h3>Exercises Added:</h3>
                    <ul>
                        {exercises.map((exercise, index) => (
                            <li key={index}>
                                {exercise.name} - {exercise.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">{isUpdate ? 'Update' : 'Create'} Workout Plan</button>
        </form>
    );
};

export default WorkoutPlanForm;
