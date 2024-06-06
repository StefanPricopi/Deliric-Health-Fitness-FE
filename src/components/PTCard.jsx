import React from 'react';
import './PTCard.css';

const PTCard = ({ pt, onSubscribe }) => {
    return (
        <div className="pt-card">
            <img
                src="src\assets\depositphotos_195522150-stock-illustration-default-placeholder-fitness-trainer-in.jpg"
                alt={`${pt.username}'s profile`}
                className="pt-card-image"
            />
            <div className="pt-card-content">
                <h3>{pt.username}</h3>
                <p>Workouts: {pt.workoutCount}</p>
                <button onClick={() => onSubscribe(pt.id)}>Subscribe</button>
            </div>
        </div>
    );
};

export default PTCard;
