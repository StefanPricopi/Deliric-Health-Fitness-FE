
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Home from './pages/Home';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutPlanDetailPage from './pages/WorkoutPlanDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import PTsPage from './pages/PTsPage';
import WebSocketService from './Api/WebSocketService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            WebSocketService.connect(onConnected, onError);

            return () => {
                WebSocketService.disconnect();
            };
        }
    }, [token]);

    const onConnected = () => {
        console.log('Connected to WebSocket');
        WebSocketService.subscribe('/topic/subscribe', onMessageReceived);
        WebSocketService.subscribe('/topic/unsubscribe', onMessageReceived);
    };

    const onError = (error) => {
        console.error('WebSocket connection error:', error);
    };

    const onMessageReceived = (message) => {
        console.log('Received message:', message);
        toast.info(`Notification: ${message.body}`);
    };

    return (
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
                    <Route path="/pts" element={
                        <ProtectedRoute>
                            <PTsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            <footer>
                <p>© 2024 Delirium Health & Fitness</p>
            </footer>
            <ToastContainer />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;
