/* API Methods to deal with Authentication */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export async function getConfig(setApikey) {
    console.log("Fetching")
    fetch('http://127.0.0.1:5000/api/firebase-config')
    .then(response => {
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok.');
        }
        return response.json(); // Parse the JSON response
    })
    .then(credentials => {
        // Use credentials.json content as firebaseConfig
        const firebaseConfig = {
            apiKey: credentials.apiKey,
            authDomain: credentials.authDomain,
            databaseURL: credentials.databaseURL,
            projectId: credentials.projectId,
            storageBucket: credentials.storageBucket,
            messagingSenderId: credentials.messagingSenderId,
            appId: credentials.appId,
            measurementId: credentials.measurementId
        };
        setApikey(firebaseConfig);
    });
};

export function signInWithGoogle(setUserID) {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // Sign in
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Successful sign-in, you can access user information here
            const user = result.user;
            console.log(user);
            console.log(user.displayName);
            createAccount(user.uid, user.displayName);
            setUserID(user.uid);
            createCookie('userName', user.displayName)
            createCookie('userID', user.uid);
            createCookie("profileImage", user.photoURL);
            })
            .catch((error) => {
            // Handle errors here
            console.error('Google sign-in error: ', error);
    }); 
  };
  

export function createAccount(userID, displayName) {
    const endpoint = 'http://127.0.0.1:5000/api/create-account';
    const data = {
        userID: userID,
        displayName: displayName
    }; // JSON payload

    fetch(endpoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        // Add any other headers if required
        },
        body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => {
        if (response.ok) {
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

export function createCookie(name, value, days) {
    let expires = '';
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    
    document.cookie = name + '=' + value + expires + '; path=/';
}

export function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
  
      // Check if the cookie starts with the specified name
      if (cookie.indexOf(name) === 0) {
        // Return the value of the cookie
        return cookie.substring(name.length, cookie.length);
      }
    }
  
    // Return null if the cookie is not found
    return null;
  }  

export function logOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
