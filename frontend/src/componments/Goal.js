import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import BoldParagraph from './BoldParagraph';
import Heading5 from './Heading5';
import './Link.css';
import './Goal.css';

function Goal({ start, end, title, dueDate }) {
    const calculateTimeLeft = () => {
        const dueDateParts = dueDate.split('/');
        const due = new Date(dueDateParts[2], dueDateParts[1] - 1, dueDateParts[0]); // Months are 0-indexed in JavaScript
        const now = new Date();
        const difference = due - now;

        if (difference <= 0) {
            const timeLeft = 'Expired';
            return timeLeft;
        }

        const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
        const monthsLeft = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));

        if (hoursLeft <= 24) {
            const timeLeft = `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} left`;
            return timeLeft;
        } else if (daysLeft <= 31) {
            const timeLeft = `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
            return timeLeft;
        } else {
            const timeLeft = `${monthsLeft} month${monthsLeft !== 1 ? 's' : ''} left`;
            return timeLeft;
        }
    };

    return (
        <div className="goalContainer">
            <ProgressIndicator start={start} end={end}/>
            <div className="textContainer">
                <BoldParagraph text={title} />
                <Heading5 text={calculateTimeLeft()} />
                <a className="link" style={{display: "flex", width: "fit-content", paddingTop: "8px"}}>Edit</a>
            </div>
        </div>
    );
}

export default Goal;
