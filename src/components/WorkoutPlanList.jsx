import React from 'react';
import WorkoutPlanCard from './WorkoutPlanCard';
import './WorkoutPlanList.css';

const WorkoutPlanList = ({ workoutPlans }) => {
    console.log('Rendering WorkoutPlanList with plans:', workoutPlans);

    if (!Array.isArray(workoutPlans) || workoutPlans.length === 0) {
        return <div>No workout plans available.</div>;
    }

    return (
        <div className="workout-plan-list">
            {workoutPlans.map(workoutPlan => (
                <WorkoutPlanCard key={workoutPlan.id} workoutPlan={workoutPlan} />
            ))}
        </div>
    );
};

export default WorkoutPlanList;
