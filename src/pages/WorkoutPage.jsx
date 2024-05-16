import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import CreateWorkoutPlanForm from '../components/CreateWorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import WorkoutPlanService from '../Api/WorkoutPlanService';

const WorkoutPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const { role } = useAuth();

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
            await WorkoutPlanService.addWorkoutPlan(newWorkoutPlan);
            refreshWorkoutPlans();
        } catch (error) {
            console.error("Error creating workout plan:", error);
        }
    };

    return (
        <div className="container">
            <div className="inner">
                <CreateWorkoutPlanForm onSubmit={handleCreateWorkoutPlan} visible={role === 'PT'} />
                <WorkoutPlanList workoutPlans={workoutPlans} />
            </div>
        </div>
    );
};

export default WorkoutPage;
