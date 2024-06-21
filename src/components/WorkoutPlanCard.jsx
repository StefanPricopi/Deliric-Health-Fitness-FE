
import React from 'react';
import { Link } from 'react-router-dom';
import './WorkoutPlanCard.css';

const WorkoutPlanCard = ({ workoutPlan }) => {
    console.log('Rendering WorkoutPlanCard for plan:', workoutPlan);

    return (
        <div className="workout-plan-card">
            <div className="workout-plan-content">
                <h2>{workoutPlan.name}</h2>
                <p>{workoutPlan.description}</p>
                {workoutPlan.user && (
                    <p><strong>Posted by:</strong> {workoutPlan.user.username}</p>
                )}
                <Link to={`/workout/${workoutPlan.id}`} className="details-link">View Details</Link>
            </div>
        </div>
    );
};

export default WorkoutPlanCard;
