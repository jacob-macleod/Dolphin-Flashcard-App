import React, { useState, useEffect } from 'react';
import HeatmapItem from '../HeatmapItem/HeatmapItem';
import MenuItem from '../MenuItem';
import Heading5 from '../../componments/Text/Heading5/Heading5';
import DelayedElement from '../DelayedElement';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';
import './Heatmap.css';

function Heatmap() {
    const [year, setYear] = useState(getYearWithIncrement(0));
    const [currentYearClicked, setCurrentYearClicked] = useState(true);
    const [lastYearClicked, setLastYearClicked] = useState(false);
    const [yearBeforeLastClicked, setYearBeforeLastClicked] = useState(false);
    const yearWidth = "36px";
    const [heatmapData, setHeatmapData] = useState(null);

    function chooseYear(year) {
        if (year === "currentYear") {
            setCurrentYearClicked(true);
            setLastYearClicked(false);
            setYearBeforeLastClicked(false);
        } else if (year === "lastYear") {
            setCurrentYearClicked(false);
            setLastYearClicked(true);
            setYearBeforeLastClicked(false);
        } else if (year === "yearBeforeLast") {
            setCurrentYearClicked(false);
            setLastYearClicked(false);
            setYearBeforeLastClicked(true);
        }
    }

    function getYearWithIncrement(increment) {
        const currentYear = new Date().getFullYear();
        const resultYear = currentYear + increment;
        return resultYear.toString();
    }

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
        apiManager.getHeatmap(getCookie("jwtToken"), setHeatmapData);
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

                    <div onClick={() => {setYear(getYearWithIncrement(0)); chooseYear("currentYear")}}>
                        <MenuItem clicked={currentYearClicked} text={getYearWithIncrement(0)} width={yearWidth} />
                    </div>

                    <div onClick={() => {setYear(getYearWithIncrement(-1)); chooseYear("lastYear")}}>
                        <MenuItem clicked={lastYearClicked} text={getYearWithIncrement(-1)} width={yearWidth}/>
                    </div>

                    <div onClick={() => {setYear(getYearWithIncrement(-2)); chooseYear("yearBeforeLast")}}>
                        <MenuItem clicked={yearBeforeLastClicked} text={getYearWithIncrement(-2)} width={yearWidth} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Heatmap;
