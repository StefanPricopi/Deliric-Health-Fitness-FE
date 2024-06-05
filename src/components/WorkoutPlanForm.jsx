import React, { useEffect, useState } from 'react';
import { parseJwt } from '../utilities/jwtUtils'; 

const WorkoutPlanForm = ({ onSubmit, initialData, isUpdate, onAddExercise, visible }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [durationInDays, setDurationInDays] = useState(0);
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [exerciseDurationInMinutes, setExerciseDurationInMinutes] = useState(0);
    const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState('');
    const [exerciseValidationErrors, setExerciseValidationErrors] = useState({
        name: '',
        description: '',
        durationInMinutes: '',
        muscleGroup: ''
    });

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setDurationInDays(initialData.durationInDays || 0);
        }
    }, [initialData]);

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Workout name is required';
        }
        if (!description.trim()) {
            errors.description = 'Description is required';
        }
        if (!durationInDays || durationInDays <= 0) {
            errors.durationInDays = 'Duration must be greater than 0';
        }
        return errors;
    };

    const validateExerciseForm = () => {
        const errors = {};
        if (!exerciseName.trim()) {
            errors.name = 'Name is required';
        }
        if (!exerciseDescription.trim()) {
            errors.description = 'Description is required';
        }
        if (exerciseDurationInMinutes <= 0) {
            errors.durationInMinutes = 'Duration must be greater than 0';
        }
        if (!exerciseMuscleGroup.trim()) {
            errors.muscleGroup = 'Muscle group is required';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setExerciseValidationErrors(errors);
            return;
        }
        const confirmation = window.confirm("Are you sure you want to update this workout?");
        if (confirmation) {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = parseJwt(token);
                if (decodedToken) {
                    const userId = decodedToken.userId; // Ensure your token includes userId
                    const workoutPlan = { name, description, durationInDays, userId };
                    onSubmit(workoutPlan);
                    setName('');
                    setDescription('');
                    setDurationInDays(0);
                } else {
                    alert('Invalid token');
                }
            } else {
                // Handle the case where the token is not found
                alert('User is not authenticated');
            }
        }
    };

    const handleAddExercise = () => {
        const errors = validateExerciseForm();
        if (Object.keys(errors).length === 0) {
            const confirmation = window.confirm("Are you sure you want to add this exercise?");
            if (confirmation) {
                const newExercise = {
                    name: exerciseName,
                    description: exerciseDescription,
                    durationInMinutes: exerciseDurationInMinutes,
                    muscleGroup: exerciseMuscleGroup
                };
                onAddExercise(newExercise);
                setExerciseName('');
                setExerciseDescription('');
                setExerciseDurationInMinutes(0);
                setExerciseMuscleGroup('');
                setExerciseValidationErrors({});
            }
        } else {
            setExerciseValidationErrors(errors);
        }
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setDurationInDays(0);
        setExerciseName('');
        setExerciseDescription('');
        setExerciseDurationInMinutes(0);
        setExerciseMuscleGroup('');
        setExerciseValidationErrors({});
    };

    const handleCancelExercise = () => {
        setExerciseName('');
        setExerciseDescription('');
        setExerciseDurationInMinutes(0);
        setExerciseMuscleGroup('');
        setExerciseValidationErrors({});
    };

    if (!visible) {
        return null;
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Workout Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {exerciseValidationErrors.name && <p style={{ color: 'red' }}>{exerciseValidationErrors.name}</p>}
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {exerciseValidationErrors.description && <p style={{ color: 'red' }}>{exerciseValidationErrors.description}</p>}
            </div>
            <div>
                <label htmlFor="durationInDays">Duration (Days):</label>
                <input
                    id="durationInDays"
                    type="number"
                    value={durationInDays}
                    onChange={(e) => setDurationInDays(parseInt(e.target.value, 10))}
                    required
                />
                {exerciseValidationErrors.durationInDays && <p style={{ color: 'red' }}>{exerciseValidationErrors.durationInDays}</p>}
            </div>
            <button type="submit">{isUpdate ? 'Update Workout' : 'Create Workout'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            <div>
                <h3>Add Exercise</h3>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />
                {exerciseValidationErrors.name && <p style={{ color: 'red' }}>{exerciseValidationErrors.name}</p>}
                <input
                    type="text"
                    placeholder="Exercise Description"
                    value={exerciseDescription}
                    onChange={(e) => setExerciseDescription(e.target.value)}
                />
                {exerciseValidationErrors.description && <p style={{ color: 'red' }}>{exerciseValidationErrors.description}</p>}
                <input
                    type="number"
                    placeholder="Duration in Minutes"
                    value={exerciseDurationInMinutes}
                    onChange={(e) => setExerciseDurationInMinutes(parseInt(e.target.value, 10))}
                />
                {exerciseValidationErrors.durationInMinutes && <p style={{ color: 'red' }}>{exerciseValidationErrors.durationInMinutes}</p>}
                <input
                    type="text"
                    placeholder="Muscle Group"
                    value={exerciseMuscleGroup}
                    onChange={(e) => setExerciseMuscleGroup(e.target.value)}
                />
                {exerciseValidationErrors.muscleGroup && <p style={{ color: 'red' }}>{exerciseValidationErrors.muscleGroup}</p>}
                <button type="button" onClick={handleAddExercise}>Add Exercise</button>
                <button type="button" onClick={handleCancelExercise}>Cancel</button>
            </div>
        </form>
    );
};

export default WorkoutPlanForm;
