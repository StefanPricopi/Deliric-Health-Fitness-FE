import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import ChartComponent from '../components/ChartComponent';  // Correct import
import Navbar from '../components/Navbar';
import './Dashboard.css';
import dashboardBackground from '../assets/dashboardBackground.webp';

const Dashboard = () => {
    const { token } = useAuth();
    const [workoutCounts, setWorkoutCounts] = useState([]);

    useEffect(() => {
        const fetchWorkoutCounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/workout-plans/counts-by-user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('API response:', response.data);

                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log('Parsed data:', data);

                setWorkoutCounts(data);  
            } catch (error) {
                console.error('Error fetching workout counts:', error);
                setWorkoutCounts([]);  
            }
        };

        fetchWorkoutCounts();
    }, [token]);

    return (
        <div className="dashboard-page" style={{ backgroundImage: `url(${dashboardBackground})` }}>
            <Navbar />
            <div className="content-wrapper">
                <h2>Dashboard</h2>
                <div className="chart-container">
                    <ChartComponent data={workoutCounts} />  {}
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default Dashboard;
