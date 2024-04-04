import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../componments/GhostButton';
import Heading3 from '../componments/Heading3';
import Paragraph from '../componments/Paragraph';
import Button from '../componments/Button';
import apiManager from '../api/Api';
import DelayedElement from '../componments/DelayedElement';
import './NewGoalPopup.css';
import { getCookie } from '../api/Authentication';
import { dropIn } from '../animations/animations';

function EditGoalPopup({ visible, setVisible, view }) {
    // visible is either false, or stores the goal data
    const [quantity, setQuantity] = useState("Amount of XP");
    const [option, setOption] = useState('xp');
    const [date, setDate] = useState("none");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [goalStatus] = useState(null);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const id = visible.id;

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

    // When the popup is made visible
    useEffect(() => {
        if (visible !== false) {
            // Hide the loading icon
            setLoadingIcon(false);
            // Get the goal
            const goal = visible.contents.goal;
            // Set the goal title
            setTitle(goal.title);
            // Set the goal type
            setOption(goal.type.toLowerCase());
            // Set the goal quantity
            if (goal.data.cards_to_revise === undefined) {
                setValue(goal.data.goal_xp);
            } else {
                setValue(goal.data.cards_to_revise);
            }
            // Set the goal deadline
            setDate(formatDateToJavascriptFormat(goal.end_date));
        }
    }, [visible]);

    // When the title is chaned using the input box
    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    // Format a date into dd/mm/yyyy
    function formatDateToPythonFormat(dateString) {
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

    function formatDateToJavascriptFormat(inputDate) {
        // Split the input string based on the '/' delimiter
        const parts = inputDate.split('/');
        
        // Rearrange the parts to get the desired format
        const year = parts[2];
        const month = parts[1].padStart(2, '0'); // Ensure two-digit month
        const day = parts[0].padStart(2, '0'); // Ensure two-digit day
    
        // Join the parts using the '-' delimiter
        const formattedDate = `${year}-${month}-${day}`;
        
        return formattedDate;
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
                apiManager.editXpGoal(
                    getCookie("userID"),
                    id,
                    formatDateToPythonFormat(date),
                    title,
                    value,
                    setVisible
                );
                // Show the loading icon
                setLoadingIcon(null);
                setValue("");
                setDate("none");
            }
        } else {
            if (value !== "" && date !== "none") {
                apiManager.editCardGoal(
                    getCookie("userID"),
                    id,
                    formatDateToPythonFormat(date),
                    title,
                    value,
                    setVisible
                );
                // Show the loading icon
                setLoadingIcon(null);
                setValue("");
                setDate("none");
            }
        }
    }

    return (
        visible === false ? null :
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
                className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
            >
                <Heading3 text="Edit goal:" />

                <div className="input-container">
                    <Paragraph text="Enter new title: " style={{ display: "flex", alignItems: "center" }} />
                    <input type="text" className="input" value={title} onChange={onTitleChange}/>
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

                <div style={{display: "flex", justifyContent: "center", height: "50px"}}>
                    <DelayedElement childValue={loadingIcon} child={<></>}/>
                </div>
            </motion.div>
        </div>
    );
}

export default EditGoalPopup;
