import React, { useState } from 'react';

const CreateWorkoutPlanForm = ({ onSubmit, visible }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationInDays, setDurationInDays] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      description,
      durationInDays: parseInt(durationInDays, 10)
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <div>
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Workout Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="durationInDays">Duration (Days):</label>
          <input
            id="durationInDays"
            type="number"
            value={durationInDays}
            onChange={(e) => setDurationInDays(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Workout Plan</button>
      </form>
    </div>
  );
};

export default CreateWorkoutPlanForm;
