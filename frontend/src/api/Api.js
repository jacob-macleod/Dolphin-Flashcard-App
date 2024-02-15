import serverURL from './config';

export function calculateStreak(userID, setStreak) {
    const endpoint = serverURL + 'calculate-streak';
    const data = {
        userID: userID // Use the provided userID
    }; // JSON payload

    console.log("Getting");
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed methods
            'Access-Control-Allow-Headers': 'Content-Type'
            // Add any other headers if required
        },
        body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => {
        if (response.ok) {
            console.log("Returned");
            return response.json(); // Parse JSON response
        }
        throw new Error('Network response was not ok.');
    })
    .then(([streak, status]) => {
        if (status === 200) {
            setStreak(streak.streak); // Set streak using the provided setStreak function
        } else {
            // Handle non-200 status code if needed
        }
    })
    .catch(error => {
        console.error('There was an error:', error);
        // Handle error here
    });
}

export function updateGoals(userID, setGoals) {
    const endpoint = serverURL + 'update-goal-status';
    const data = {
        userID: userID // Use the provided userID
    }; // JSON payload

    console.log("Getting");
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed methods
            'Access-Control-Allow-Headers': 'Content-Type'
            // Add any other headers if required
        },
        body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => {
        if (response.ok) {
            console.log("Returned");
            return response.json(); // Parse JSON response
        }
        throw new Error('Network response was not ok.');
    })
    .then(goals => {
        setGoals(goals); // Set goals using the provided setGoals function
    })
    .catch(error => {
        console.error('There was an error:', error);
        // Handle error here
    });
}