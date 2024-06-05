import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import ChartComponent from '../components/ChartComponent';  // Correct import

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

                // Check if response.data is a string and parse it if necessary
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log('Parsed data:', data);

                setWorkoutCounts(data);  // Set the fetched data
            } catch (error) {
                console.error('Error fetching workout counts:', error);
                setWorkoutCounts([]);  // Set to empty array on error
            }
        };

        fetchWorkoutCounts();
    }, [token]);

    return (
        <div>
            <h2>Dashboard</h2>
            <ChartComponent data={workoutCounts} />  {/* Pass workoutCounts as data prop */}
        </div>
    );
};

export default Dashboard;
