import {React, useState, useEffect} from 'react';
import HeatmapItem from './HeatmapItem';
import MenuItem from '../componments/MenuItem';
import Heading5 from './Heading5';
import DelayedElement from './DelayedElement';
import apiManager from '../api/Api';
import {getCookie} from '../api/Authentication';
import './Heatmap.css';

function Heatmap() {
    const days = {
    "01-02-2024": "2",
    "15-02-2024": "1",
    "19-02-2024":"1",
    "20-02-2024":"1",
    "21-02-2024":"1",
    "22-02-2024":"5",
    "23-02-2024":"3",
    "24-02-2024":"1",
    "25-02-2024":"3",
    "26-02-2024":"2"
    };
    const startDate = new Date("2024-02-01");
    const endDate = new Date("2024-02-29");
    const yearWidth = "36px";
    const [heatmapData, setHeatmapData] = useState(null);

    useEffect(() => {
        apiManager.getHeatmap(getCookie("userID"), setHeatmapData);
    }, []);

    useEffect(() => {
        console.log(heatmapData);
    }, []);

    return (
        <>
        <Heading5 text="XP & Streak Heatmap" style={{padding: "8px"}}/>
        <div className='overall-container'>
                <DelayedElement child={<div class="heatmap-container">
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January1"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January2"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January3"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January4"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January5"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January6"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January7"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January8"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January9"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January10"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January11"/>
                    <HeatmapItem days={days} startDate={startDate} endDate={endDate} month="January12"/>
                </div>}childValue={heatmapData}/>
        <div className='button-panel'>
            <MenuItem clicked={true} text="2023" width={yearWidth}/>
            <MenuItem text="2022" width={yearWidth}/>
            <MenuItem text="2021" width={yearWidth}/>
        </div>
      </div>
      </>
    );
}

export default Heatmap;