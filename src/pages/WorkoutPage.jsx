
import React, { useState, useEffect } from 'react';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import WorkoutPlanService from '../Api/WorkoutPlanService';

const WorkoutPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);

    const refreshWorkoutPlans = () => {
        WorkoutPlanService.getAllWorkoutPlans()
            .then(result => {
                setWorkoutPlans(result.workoutPlans); 
            })
            .catch(error => {
                console.error("Error fetching workout plans:", error);
            });
    };

    const addWorkoutPlan = (newWorkoutPlan) => {
        WorkoutPlanService.addWorkoutPlan(newWorkoutPlan)
            .then(result => {
                console.log("Workout plan added:", result);
                
            })
            .catch(error => {
                console.error("Error adding workout plan:", error);
            });
    };

    useEffect(() => {
        refreshWorkoutPlans();
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <WorkoutPlanForm onSubmit={addWorkoutPlan} mode="create" />
                <WorkoutPlanList workoutPlans={workoutPlans} />
            </div>
        </div>
    );
};

export default WorkoutPage;
