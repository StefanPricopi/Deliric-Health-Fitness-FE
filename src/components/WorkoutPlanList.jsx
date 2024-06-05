import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutPlanList = ({ workoutPlans }) => {
    if (!Array.isArray(workoutPlans)) {
        return <div>No workout plans available.</div>;
    }

    return (
        <div>
            {workoutPlans.map(workoutPlan => (
                <div key={workoutPlan.id}>
                    <h2>{workoutPlan.name}</h2>
                    <p>{workoutPlan.description}</p>
                    <Link to={`/workout/${workoutPlan.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default WorkoutPlanList;
