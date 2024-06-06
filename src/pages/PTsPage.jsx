import React, { useEffect, useState } from 'react';
import PTCard from '../components/PTCard';
import { getAllPTs } from '../Api/AuthService';
import { useAuth } from '../Context/AuthContext';
import './PTPage.css';

const PTsPage = () => {
    const [pts, setPTs] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPTs = async () => {
            try {
                const response = await getAllPTs();
                setPTs(response);
            } catch (error) {
                console.error('Error fetching PTs:', error);
            }
        };

        fetchPTs();
    }, [token]);

    const handleSubscribe = (ptId) => {
        alert(`Subscribed to PT with ID: ${ptId}`);
    };

    return (
        <div className="pt-page">
            <h1>Personal Trainers</h1>
            <div className="pt-cards">
                {pts.map(pt => (
                    <PTCard key={pt.id} pt={pt} onSubscribe={handleSubscribe} />
                ))}
            </div>
        </div>
    );
};

export default PTsPage;
