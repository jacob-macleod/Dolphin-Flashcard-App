import React from 'react';
import './HeatmapItem.css';

function HeatmapItem({days, startDate, endDate}) {
    const [dayData, setDayData] = React.useState(null);

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
        setDayData(generateDataArray());
    }, []);

    React.useEffect(() => {
        console.log(dayData);
    }, [dayData]);

    // Helper function to get the starting day of the month
    function getStartingDayOfMonth(dateString) {
        const [day, month, year] = dateString.split("-");
        const date = new Date(`${year}-${month}-01`);
        return date.getDay(); // Returns 0 for Sunday, 1 for Monday, etc.
    }
      
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
            if (addedStartPadding == false) {
                for (var i=0; i<startingDayOfMonth; i++) {
                    tableRows.push(<th key={count}></th>);
                    count ++;
                }
                addedStartPadding = true;
            }
            // Extract the day and data value from the item
            const day = item.charAt(0); // Extract the first character (day)
            const dataValue = dayData[item]; // Get the data value
    
            // Append a <th> element with the data value to the tableHeaders array
            tableRows.push(<th key={day}>{dataValue}</th>);
            count ++;

            // If 7 items have been added or it's the last item
            if (count === 7 || Object.keys(dayData).indexOf(item) === Object.keys(dayData).length - 1) {
                // Add the table row to tableHeaders
                tableHeaders.push(<tr key={count}>{tableRows}</tr>);
                tableRows = [];
                count = 0;
            }
        }
        return tableHeaders;
    }

    return (
        <table>
            <tr>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>T</th>
                <th>F</th>
                <th>S</th>
                <th>S</th>
            </tr>
            {renderTableHeaders(dayData)}
        </table>
    );
}

export default HeatmapItem;
