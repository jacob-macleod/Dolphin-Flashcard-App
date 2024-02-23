import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import BoldParagraph from './BoldParagraph';
import Heading5 from './Heading5';
import './Link.css';
import './Goal.css';

function Goal({ data, clickEvent }) {
    var start = "";
    var end = "";

    // If the goal is a card goal
    if (data.type == "XP") {
        start = data.data.starting_xp;
        end = data.data.goal_xp;
    } else {
        start = data.data.cards_revised_so_far;
        end = data.data.cards_to_revise;
    }
    const title = data.title;
    const dueDate = data.end_date;
    console.log(data);
    console.log(start);
    console.log(end);
    console.log(title);
    console.log(dueDate);
    console.log("---------------------");

    function formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }
    
        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }

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

        if (daysLeft <= 0) {
            const timeLeft = `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} left`;
            return timeLeft;
        } else if (monthsLeft <= 0) {
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
                <a className="link" style={{display: "flex", width: "fit-content", paddingTop: "8px"}} onClick={clickEvent}>Edit</a>
            </div>
        </div>
    );
}

export default Goal;
