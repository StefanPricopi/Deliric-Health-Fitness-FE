import React, { useState, useEffect } from 'react';
import CreateWorkoutPlanForm from '../components/CreateWorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import WorkoutPlanService from '../Api/WorkoutPlanService';

const WorkoutPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);

    useEffect(() => {
        refreshWorkoutPlans();
    }, []);

    const refreshWorkoutPlans = async () => {
        try {
            const plans = await WorkoutPlanService.getAllWorkoutPlans();
            setWorkoutPlans(plans.workoutPlans); 
        } catch (error) {
            console.error("Error fetching workout plans:", error);
        }
    };

    const handleCreateWorkoutPlan = async (newWorkoutPlan) => {
        try {
            const createdPlan = await WorkoutPlanService.addWorkoutPlan(newWorkoutPlan);
            
            refreshWorkoutPlans(); 
        } catch (error) {
            console.error("Error creating workout plan:", error);
        }
    };

    return (
        <div className="container">
            <div className="inner">
                <CreateWorkoutPlanForm onSubmit={handleCreateWorkoutPlan} />
                <WorkoutPlanList workoutPlans={workoutPlans} />
            </div>
        </div>
    );
};

export default WorkoutPage;
