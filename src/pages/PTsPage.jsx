import React, { useEffect, useState } from 'react';
import PTCard from '../components/PTCard';
import { getAllPTs, subscribe, unsubscribe, getUserSubscriptions } from '../Api/PTService';
import { useAuth } from '../Context/AuthContext';
import WebSocketService from '../Api/WebSocketService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import './PTPage.css';
import ptBackground from '../assets/ptBackground.jpg';

const PTsPage = () => {
    const [pts, setPTs] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const { token, user } = useAuth();

    useEffect(() => {
        const fetchPTs = async () => {
            try {
                const response = await getAllPTs();
                setPTs(response);
            } catch (error) {
                console.error('Error fetching PTs:', error);
            }
        };

        const fetchSubscriptions = async () => {
            try {
                if (user && user.userId) {
                    const response = await getUserSubscriptions(user.userId);
                    if (response && Array.isArray(response.subscriptions)) {
                        setSubscriptions(response.subscriptions.map(sub => sub.ptId));
                    } else {
                        setSubscriptions([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
                setSubscriptions([]);
            }
        };

        fetchPTs();
        fetchSubscriptions();
    }, [token, user]);

    const handleSubscribe = async (ptId) => {
        if (!user || !user.userId) {
            console.error('User is not defined or user id is missing');
            toast.error('User is not defined or user id is missing');
            return;
        }

        try {
            await subscribe(user.userId, ptId);
            if (WebSocketService.connected) {
                WebSocketService.send('/app/subscribe', { userId: user.userId, ptId });
            } else {
                console.error('WebSocket is not connected');
                toast.error('WebSocket is not connected');
            }
            toast.success('Subscribed successfully');
            setSubscriptions([...subscriptions, ptId]);
        } catch (error) {
            console.error('Error during subscription:', error);
            toast.error('Error during subscription');
        }
    };

    const handleUnsubscribe = async (ptId) => {
        if (!user || !user.userId) {
            console.error('User is not defined or user id is missing');
            toast.error('User is not defined or user id is missing');
            return;
        }

        try {
            await unsubscribe(user.userId, ptId);
            if (WebSocketService.connected) {
                WebSocketService.send('/app/unsubscribe', { userId: user.userId, ptId });
            } else {
                console.error('WebSocket is not connected');
                toast.error('WebSocket is not connected');
            }
            toast.success('Unsubscribed successfully');
            setSubscriptions(subscriptions.filter(id => id !== ptId));
        } catch (error) {
            console.error('Error during unsubscription:', error);
            toast.error('Error during unsubscription');
        }
    };

    const scrollLeft = () => {
        document.querySelector('.pt-cards').scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        document.querySelector('.pt-cards').scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    };

    return (
        <div className="pt-page" style={{ backgroundImage: `url(${ptBackground})` }}>
            <Navbar />
            <div className="content-wrapper">
                <h1>Personal Trainers</h1>
                <div className="pt-carousel">
                    <button className="carousel-button left" onClick={scrollLeft}>&lt;</button>
                    <div className="pt-cards">
                        {pts.map(pt => (
                            <PTCard
                                key={pt.id}
                                pt={pt}
                                onSubscribe={handleSubscribe}
                                onUnsubscribe={handleUnsubscribe}
                                isSubscribed={subscriptions.includes(pt.id)}
                            />
                        ))}
                    </div>
                    <button className="carousel-button right" onClick={scrollRight}>&gt;</button>
                </div>
                <ToastContainer />
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default PTsPage;
