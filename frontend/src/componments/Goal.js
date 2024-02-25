import React from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';
import ProgressIndicator from './ProgressIndicator';
import BoldParagraph from './BoldParagraph';
import Heading5 from './Heading5';
import Image from './Image';
import deleteIcon from '../static/delete-icon.svg';
import './Link.css';
import './Goal.css';

function Goal({ data, id, clickEvent }) {
    var start = "";
    var end = "";
    const iconWidth = "16px";
    const iconHeight = "130px";

    // If the goal is a card goal
    if (data.type === "XP") {
        start = data.data.starting_xp;
        end = data.data.goal_xp;
    } else {
        start = data.data.cards_revised_so_far;
        end = data.data.cards_to_revise;
    }
    const title = data.title;
    const dueDate = data.end_date;

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
                <p className="link" style={{display: "flex", width: "fit-content", paddingTop: "8px", margin: "0px"}} onClick={clickEvent}>Edit</p>
            </div>
            <Image width={iconWidth} height={iconHeight} url={deleteIcon} onClick={() => {apiManager.deleteGoal(
                getCookie("userID"), id, () => {window.location.reload()}
            )}}/>
        </div>
    );
}

export default Goal;
