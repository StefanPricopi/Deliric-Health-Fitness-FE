import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import CreateWorkoutPlanForm from '../components/CreateWorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import WorkoutPlanService from '../Api/WorkoutPlanService';
import { getAllPTs } from '../Api/AuthService';

const WorkoutPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [pts, setPts] = useState([]);
    const [selectedPt, setSelectedPt] = useState('');
    const { role } = useAuth();

    useEffect(() => {
        refreshWorkoutPlans();
        fetchPTs();
    }, []);

    useEffect(() => {
        if (selectedPt) {
            fetchWorkoutPlansByPT(selectedPt);
        } else {
            refreshWorkoutPlans();
        }
    }, [selectedPt]);

    const refreshWorkoutPlans = async () => {
        try {
            console.log("Fetching all workout plans...");
            const response = await WorkoutPlanService.getAllWorkoutPlans();
            console.log("Fetched workout plans:", response);
            setWorkoutPlans(response.workoutPlans || []); // Ensure workoutPlans is always an array
        } catch (error) {
            console.error("Error fetching workout plans:", error);
        }
    };

    const fetchWorkoutPlansByPT = async (ptId) => {
        try {
            console.log(`Fetching workout plans for PT with ID: ${ptId}`);
            const response = await WorkoutPlanService.getWorkoutPlansByPT(ptId);
            console.log(`Fetched workout plans for PT ${ptId}:`, response);
            setWorkoutPlans(response.workoutPlans || []); // Ensure response is always an array
        } catch (error) {
            console.error("Error fetching workout plans by PT:", error);
        }
    };

    const fetchPTs = async () => {
        try {
            console.log("Fetching all PTs...");
            const ptList = await getAllPTs();
            console.log("Fetched PTs:", ptList);
            setPts(ptList || []); // Ensure ptList is always an array
        } catch (error) {
            console.error("Error fetching PTs:", error);
        }
    };

    const handleCreateWorkoutPlan = async (newWorkoutPlan) => {
        try {
            console.log("Creating new workout plan:", newWorkoutPlan);
            await WorkoutPlanService.addWorkoutPlan(newWorkoutPlan);
            refreshWorkoutPlans();
        } catch (error) {
            console.error("Error creating workout plan:", error);
        }
    };

    const handlePTChange = (e) => {
        setSelectedPt(e.target.value);
    };

    const handleShowAllWorkouts = () => {
        setSelectedPt('');
        refreshWorkoutPlans();
    };

    return (
        <div className="container">
            <div className="inner">
                {role === 'PT' && (
                    <CreateWorkoutPlanForm onSubmit={handleCreateWorkoutPlan} visible={true} />
                )}
                <div>
                    <button onClick={handleShowAllWorkouts}>Show All Workouts</button>
                    <select value={selectedPt} onChange={handlePTChange}>
                        <option value="">Select PT</option>
                        {pts.map(pt => (
                            <option key={pt.id} value={pt.id}>
                                {pt.username}
                            </option>
                        ))}
                    </select>
                </div>
                <WorkoutPlanList workoutPlans={workoutPlans} />
            </div>
        </div>
    );
};

export default WorkoutPage;
