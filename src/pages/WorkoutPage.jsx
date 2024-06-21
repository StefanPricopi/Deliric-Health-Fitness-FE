import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import CreateWorkoutPlanForm from '../components/CreateWorkoutPlanForm';
import WorkoutPlanList from '../components/WorkoutPlanList';
import WorkoutPlanService from '../Api/WorkoutPlanService';
import { getAllPTs } from '../Api/AuthService';
import Navbar from '../components/Navbar';
import backgroundWorkouts from '../assets/backgroundWorkouts.jpg';
import './WorkoutPage.css';

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
            if (response && response.workoutPlans) {
                setWorkoutPlans(response.workoutPlans); // Ensure workoutPlans is always an array
            } else {
                setWorkoutPlans([]);
            }
        } catch (error) {
            console.error("Error fetching workout plans:", error);
        }
    };

    const fetchWorkoutPlansByPT = async (ptId) => {
        try {
            console.log(`Fetching workout plans for PT with ID: ${ptId}`);
            const response = await WorkoutPlanService.getWorkoutPlansByPT(ptId);
            console.log(`Fetched workout plans for PT ${ptId}:`, response);
            if (Array.isArray(response)) {
                setWorkoutPlans(response); // Ensure response is always an array
            } else if (response && response.workoutPlans) {
                setWorkoutPlans(response.workoutPlans); // Ensure response contains workoutPlans array
            } else {
                setWorkoutPlans([]);
            }
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
        console.log(`Selected PT: ${e.target.value}`);
        setSelectedPt(e.target.value);
    };

    const handleShowAllWorkouts = () => {
        setSelectedPt('');
        refreshWorkoutPlans();
    };

    useEffect(() => {
        document.body.classList.add('scrollable-page');
        return () => {
            document.body.classList.remove('scrollable-page');
        };
    }, []);

    return (
        <div className="workout-page" style={{ backgroundImage: `url(${backgroundWorkouts})` }}>
            <Navbar />
            <div className="content-wrapper">
                {role === 'PT' && (
                    <CreateWorkoutPlanForm onSubmit={handleCreateWorkoutPlan} visible={true} />
                )}
                <div className="filter-container">
                    <button className="filter-button" onClick={handleShowAllWorkouts}>Show All Workouts</button>
                    <select className="filter-select" value={selectedPt} onChange={handlePTChange}>
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
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default WorkoutPage;
