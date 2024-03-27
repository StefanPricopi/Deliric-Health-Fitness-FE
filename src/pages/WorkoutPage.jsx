import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import { Link } from 'react-router-dom';

const WorkoutPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);

    const refreshWorkoutPlans = () => {
        axios.get("http://localhost:8080/workout-plans")
            .then(result => {
                setWorkoutPlans(result.data.workoutPlans);
            })
            .catch(error => {
                console.error("Error fetching workout plans:", error);
            });
    };

    const addWorkoutPlan = (newWorkoutPlan) => {
        axios.post("http://localhost:8080/workout-plans", newWorkoutPlan)
            .then(result => {
                console.log("Workout plan added:", result.data);
                refreshWorkoutPlans();
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
