import React, { useState, useEffect } from 'react';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph/Paragraph';
import '../Modal.css';
import './NewGoalPopup.css';

function NewGoalForm({ setVisible, quantity, setQuantity, option, setOption, date, setDate, value, setValue, goalStatus }) {

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

    // Handler function to update the option state when a new option is selected
    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    return (
        <>
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
        </>
    );
}

export default NewGoalForm;
