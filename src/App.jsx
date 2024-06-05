import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './pages/Home';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutPlanDetailPage from './pages/WorkoutPlanDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const App = () => {
    console.log("App component rendering");

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <header>
                        <Navbar />
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/workouts" element={
                                <ProtectedRoute>
                                    <WorkoutPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/workout/:id" element={
                                <ProtectedRoute>
                                    <WorkoutPlanDetailPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </main>
                    <footer>
                        <p>© 2024 Delirium Health & Fitness</p>
                    </footer>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
