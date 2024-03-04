import React, { useState, useEffect } from 'react';
import HeatmapItem from './HeatmapItem';
import MenuItem from '../componments/MenuItem';
import Heading5 from './Heading5';
import DelayedElement from './DelayedElement';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';
import './Heatmap.css';

function Heatmap() {
    const [year, setYear] = useState("2024");
    const yearWidth = "36px";
    const [heatmapData, setHeatmapData] = useState(null);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Function to get the start and end dates for each month in the year
    const getMonthDates = (year) => {
        const months = [];
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);
            months.push({ startDate, endDate });
        }
        return months;
    };

    const monthDates = getMonthDates(year);

    useEffect(() => {
        apiManager.getHeatmap(getCookie("userID"), setHeatmapData);
    }, []);

    return (
        <>
            <Heading5 text="XP & Streak Heatmap" style={{ padding: "8px" }} />
            <div className='overall-container'>
                <DelayedElement child={
                    <div className="heatmap-container">
                        {monthDates.map(({ startDate, endDate }, index) => (
                            <HeatmapItem days={heatmapData} startDate={startDate} endDate={endDate} month={monthNames[index]} />
                        ))}
                    </div>
                } childValue={heatmapData} />
                <div className='button-panel'>
                    <MenuItem clicked={true} text="2024" width={yearWidth} />
                    <MenuItem text="2023" width={yearWidth} onClick={() => {setYear("2023")}}/>
                    <MenuItem text="2022" width={yearWidth} />
                </div>
            </div>
        </>
    );
}

export default Heatmap;
