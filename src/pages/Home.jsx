import React from 'react';
import './Home.css';
import backgroundImage from '../assets/backgroundImage.jpg'; 
import Navbar from '../components/Navbar';
import home_overlay from '../assets/home-overlay.png'

const Home = () => {
    return (
        <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar />
            <div className="slogan-container">
            </div>
            <div className='home-overlay'>
                <div className='home-overlay-text'>
                    <div>Find Your Trainer, Control Your Body, Lose Your Mind.</div>
                    <div>Begin your journey with us now.</div>
                </div>
               
            </div>
            <footer className="footer">
                &copy; 2024 Delirium Health & Fitness
            </footer>
        </div>
    );
};

export default Home;
