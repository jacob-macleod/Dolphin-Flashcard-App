import React, { useState, useEffect } from 'react';
import GhostButton from '../componments/GhostButton';
import Heading3 from '../componments/Heading3';
import Paragraph from '../componments/Paragraph';
import Button from '../componments/Button';
import apiManager from '../api/Api';
import './NewGoalPopup.css';
import { getCookie } from '../api/Authentication';

function NewGoalPopup({ visible, setVisible }) {
    const [quantity, setQuantity] = useState("Amount of XP");
    const [option, setOption] = useState('xp');
    const [date, setDate] = useState("none");
    const [value, setValue] = useState("");
    const [goalStatus, setGoalStatus] = useState(null);

    const onDateChange = (event) => {
       setDate(event.target.value);
    };

    const onInputChange = (event) => {
        const inputValue = event.target.value;
        // Regular expression to match digits (0-9)
        const numberPattern = /^[0-9]*$/;
        // Check if the input value contains only numbers
        if (numberPattern.test(inputValue)) {
            // If the value is a number, save it
            setValue(inputValue);
        }
    };

    function formatDate(dateString) {
        // Split the date string into an array of year, month, and day
        const [year, month, day] = dateString.split('-');
    
        // Create a new Date object using the year, month, and day
        const date = new Date(year, month - 1, day);
    
        // Get the day, month, and year components from the Date object
        const formattedDay = date.getDate().toString().padStart(2, '0');
        const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = date.getFullYear();
    
        // Return the formatted date string in the "dd/mm/yyyy" format
        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        setQuantity(option === 'xp' ? "Amount of XP: " : "Number of flashcards: ");
    }, [option]);

    // Close the popup when a goal has been created
    useEffect(() => {
        if (goalStatus != null) {
            setVisible(false);
        }
    }, [goalStatus, setVisible]);

    function createGoal() {
        if (option === "xp") {
            // If values have been set
            if (value !== "" && date !== "none") {
                apiManager.createXpGoal(getCookie("userID"), value, formatDate(date), setGoalStatus);
                setValue("");
                setDate("none");
            }
        } else {
            if (value !== "" && date !== "none") {
                apiManager.createCardGoal(getCookie("userID"), value, formatDate(date), setGoalStatus);
                setValue("");
                setDate("none");
            }
        }
    }
    // Handler function to update the option state when a new option is selected
    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    return (
        visible === false ? null :
        <div className='darken-background'>
            <div className="popup-container">
                <Heading3 text="Set a new goal:" />

                <div className="input-container">
                    <Paragraph text="Type of goal: " style={{ display: "flex", alignItems: "center" }} />
                    <select className="dropdown" value={option} onChange={handleOptionChange}>
                        <option value="xp" className="option">XP Goal</option>
                        <option value="flashcards" className="option">Flashcard Goal</option>
                    </select>
                </div>

                <div className="input-container">
                    <Paragraph text={quantity} style={{ display: "flex", alignItems: "center" }} />
                    <input type="number" className="input" value={value} onChange={onInputChange}/>
                </div>

                <Heading3 text="Deadline:" />
                <div className="input-container">
                    <Paragraph text="Custom date: " style={{ display: "flex", alignItems: "center" }} />
                    <input type='date' className="date" value={date} onChange={onDateChange} min={today}/>
                </div>

                <div style={{display: "flex"}}>
                    <GhostButton text="Cancel" onClick={() => setVisible(false)} />
                    <Button text="Set Goal" onClick={createGoal} />
                </div>
            </div>
        </div>
    );
}

export default NewGoalPopup;
