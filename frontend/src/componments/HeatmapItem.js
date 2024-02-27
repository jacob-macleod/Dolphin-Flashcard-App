import React from 'react';
import './HeatmapItem.css';
import Image from './Image';
import Heading5 from './Heading5';
import Paragraph from './Paragraph';
import xIcon from '../static/blue-x-icon.svg';

function HeatmapItem({days, startDate, endDate, month}) {
    const [dayData, setDayData] = React.useState(null);

    // Function to format a date as "dd-mm-yyyy"
    function formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // Add leading zeros if necessary
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${day}-${month}-${year}`;
    }

    React.useEffect(() => {
    // Generate the array of data points
    function generateDataArray() {
        // The data to store
        let data = {};
    
        // Iterate over dates between startDate and endDate
        let currentDate = new Date(startDate);
        const end = new Date(endDate);
    
        while (currentDate <= end) {
            // Format the current date as "dd-mm-yyyy"
            let formattedDate = formatDate(currentDate);
    
            // If the date is in days
            var count = "0";
            for (var i = 0; i < Object.keys(days).length; i++) {
                if (days[formattedDate] !== undefined) {
                    count = days[formattedDate];
                }
            }
            // Append "date": "0" to data
            data[formattedDate] = count;
    
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return data;
    }

        setDayData(generateDataArray());
    }, [days, endDate, startDate]);

    React.useEffect(() => {
        console.log(dayData);
    }, [dayData]);

    // Helper function to get the starting day of the month
    function getStartingDayOfMonth(dateString) {
        const month = dateString.split("-")[1];
        const year = dateString.split("-")[2];
        const date = new Date(`${year}-${month}-01`);
        return date.getDay(); // Returns 0 for Sunday, 1 for Monday, etc.
    }

    function getHighestValue() {
        if (!dayData) {
            return null;
        }
        let highestValue = 0;
    
        // Iterate through each value in dayData
        for (const value of Object.values(dayData)) {
            // Parse the value as a number and compare with highestValue
            const numericValue = parseInt(value);
            if (!isNaN(numericValue) && numericValue > highestValue) {
                highestValue = numericValue;
            }
        }
    
        return highestValue;
    }

    const noStreakIcon = <div className='image-wrapper'><Image url={xIcon} width='12px' height='12px' paddingRight='0px'/></div>;
    const highestStreakValue = getHighestValue();
    function renderTableHeaders(dayData) {
        // Check if dayData is null
        if (!dayData) {
            return null;
        }

        // Initialize an empty array to store the table header elements
        let tableHeaders = [];
        let tableRows = [];

        // Iterate through each item in dayData
        let count = 0;
        var startingDayOfMonth = getStartingDayOfMonth(Object.keys(dayData)[0]) - 1; // Adjusted to start from Monday 
        var addedStartPadding = false;
        for (const item in dayData) {
            // Add padding to the start
            if (addedStartPadding === false) {
                for (var i=0; i<startingDayOfMonth; i++) {
                    tableRows.push(<th key={count} className='table-item'></th>);
                    count ++;
                }
                addedStartPadding = true;
            }
            // Extract the day and data value from the item
            const day = item.charAt(0); // Extract the first character (day)
            const dataValue = dayData[item]; // Get the data value
            
            const relativeStreakSize = parseInt(dataValue) / highestStreakValue;
            // Append the correct item to the array
            if (dataValue === "0") {
                tableRows.push(<th key={day} className='table-item'>{noStreakIcon}</th>);
            } else {
                tableRows.push(<th key={day} className='table-item'>
                    <div className={
                        relativeStreakSize < 0.2 ? "low-streak" :
                        relativeStreakSize < 0.5 ? "medium-streak" :
                        relativeStreakSize < 0.7 ? "high-streak" :
                        "highest-streak"
                    }></div>
                </th>);
            }
            count ++;

            // If 7 items have been added or it's the last item
            if (count === 7 || Object.keys(dayData).indexOf(item) === Object.keys(dayData).length - 1) {
                // Add the table row to tableHeaders
                tableHeaders.push(<tr key={count} className='table-row'>{tableRows}</tr>);
                tableRows = [];
                count = 0;
            }
        }
        return tableHeaders;
    }

    return (
        <div class="heatmap-item-container">
            <Paragraph text={month} style={{
                marginTop: "4px",
                marginBottom: "4px",
            }}/>
            <table>
                <tr className='table-row'>
                    <th className='table-item'><Heading5 color='black' text="M"/></th>
                    <th className='table-item'><Heading5 color='black' text="T"/></th>
                    <th className='table-item'><Heading5 color='black' text="W"/></th>
                    <th className='table-item'><Heading5 color='black' text="T"/></th>
                    <th className='table-item'><Heading5 color='black' text="F"/></th>
                    <th className='table-item'><Heading5 color='black' text="S"/></th>
                    <th className='table-item'><Heading5 color='black' text="S"/></th>
                </tr>
                {renderTableHeaders(dayData)}
            </table>
        </div>
    );
}

export default HeatmapItem;
