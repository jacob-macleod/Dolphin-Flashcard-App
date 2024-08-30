import React, { useState, useEffect } from 'react';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import NewGoalForm from './NewGoalForm';
import Modal from '../Modal';
import apiManager from '../../../api/Api';
import '../Modal.css';
import './NewGoalPopup.css';
import { getCookie } from '../../../api/Authentication';

function NewGoalPopup({ visible, setVisible, view }) {
    const [quantity, setQuantity] = useState("Amount of XP");
    const [option, setOption] = useState('xp');
    const [date, setDate] = useState("none");
    const [value, setValue] = useState("");
    const [goalStatus, setGoalStatus] = useState(null);

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

    function createGoal() {
        if (option === "xp") {
            // If values have been set
            if (value !== "" && date !== "none") {
                apiManager.createXpGoal(getCookie("jwtToken"), value, formatDate(date), setGoalStatus);
                setValue("");
                setDate("none");
            }
        } else {
            if (value !== "" && date !== "none") {
                apiManager.createCardGoal(getCookie("jwtToken"), value, formatDate(date), setGoalStatus);
                setValue("");
                setDate("none");
            }
        }
    }

    return (
        <Modal visible={visible} view={view}>
            <NewGoalForm
                setVisible={setVisible}
                quantity={quantity}
                setQuantity={setQuantity}
                option={option}
                setOption={setOption}
                date={date}
                setDate={setDate}
                value={value}
                setValue={setValue}
                goalStatus={goalStatus}
            />

            <div style={{display: "flex"}}>
                <GhostButton text="Cancel" onClick={() => setVisible(false)} />
                <Button text="Set Goal" onClick={createGoal} />
            </div>
        </Modal>
    );
}

export default NewGoalPopup;
