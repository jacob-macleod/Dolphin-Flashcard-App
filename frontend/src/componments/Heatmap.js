import React from 'react';
import HeatmapItem from './HeatmapItem';
import './Heatmap.css';

function Heatmap() {
    const days = {
    "01-02-2024": "2",
    "20-02-2024": "1",
    "25-02-2024":"3",
    "26-02-2024":"2"
    };
    const startDate = new Date("2024-02-01");
    const endDate = new Date("2024-02-29");

    return (
        <div class="heatmap-container">
            <HeatmapItem days={days} startDate={startDate} endDate={endDate}/>
      </div>
    );
}

export default Heatmap;