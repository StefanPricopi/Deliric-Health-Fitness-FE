import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutPlanDetailPage from './pages/WorkoutPlanDetailPage';
import './styles/style.css'; 

const App = () => {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Workouts</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<WorkoutPage />} />
                        <Route path="/workout/:id" element={<WorkoutPlanDetailPage />} />
                    </Routes>
                </main>
                <footer>
                    <p>© 2024 Delrium health & fitness</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
