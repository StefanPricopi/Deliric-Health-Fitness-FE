import React, { useEffect, useState } from 'react';

const WorkoutPlanForm = ({ onSubmit, initialData, isUpdate, onAddExercise }) => {
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

    const handleSubmit = e => {
        e.preventDefault();
        const workoutPlan = { name, description, durationInDays };
        onSubmit(workoutPlan);
    };

    const handleAddExercise = () => {
        
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

        if (Object.keys(errors).length === 0) {
            
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
        } else {
           
            setExerciseValidationErrors(errors);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
           
            <div>
                <h3>Add Exercise</h3>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={e => setExerciseName(e.target.value)}
                />
                <span>{exerciseValidationErrors.name}</span>
                <input
                    type="text"
                    placeholder="Exercise Description"
                    value={exerciseDescription}
                    onChange={e => setExerciseDescription(e.target.value)}
                />
                <span>{exerciseValidationErrors.description}</span>
                <input
                    type="number"
                    placeholder="Duration in Minutes"
                    value={exerciseDurationInMinutes}
                    onChange={e => setExerciseDurationInMinutes(parseInt(e.target.value))}
                />
                <span>{exerciseValidationErrors.durationInMinutes}</span>
                <input
                    type="text"
                    placeholder="Muscle Group"
                    value={exerciseMuscleGroup}
                    onChange={e => setExerciseMuscleGroup(e.target.value)}
                />
                <span>{exerciseValidationErrors.muscleGroup}</span>
                <button type="button" onClick={handleAddExercise}>Add Exercise</button>
            </div>
           
        </form>
    );
};

export default WorkoutPlanForm;
