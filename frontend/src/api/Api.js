import serverURL from './config';

export function calculateStreak(userID) {
    const endpoint = serverURL + 'calculate-streak';
    const data = {
        userID: "uNQGiHzw1vODhLrm5CEkZCVhMOw1"
    }; // JSON payload
    console.log("Getting");
    fetch(endpoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
        },
        body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => {
        if (response.ok) {
            console.log("Returned")
            return response.json(); // Parse response JSON if successful
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Account creation successful:', data);
        // Handle success response here
    })
    .catch(error => {
        console.error('There was an error creating the account:', error);
        // Handle error here
    });
}