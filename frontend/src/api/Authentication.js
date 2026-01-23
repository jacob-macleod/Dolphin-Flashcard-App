/* API Methods to deal with Authentication */
import firebase from 'firebase/compat/app';
import serverURL from './config';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export function signInWithGoogle(setJwtToken, setErrorMessage, forceRecreate) {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // Sign in
    firebase.auth().signInWithPopup(provider)
        .then(async (result) => {
            // Successful sign-in, you can access user information here
            const user = result.user;
            const idToken = await user.getIdToken();
            const isNewUser = result.additionalUserInfo.isNewUser;

            if (isNewUser || forceRecreate == "true") {
                createAccount(user.uid, user.displayName, idToken, setJwtToken, "test", "4be0643f-1d98-573b-97cd-ca98a65347dd", setErrorMessage);
            } else {
                signIn(user.uid, idToken, setJwtToken, "test", "4be0643f-1d98-573b-97cd-ca98a65347dd", setErrorMessage);
            }
            //createCookie('userID', user.uid);
            createCookie('userName', user.displayName)
            createCookie("profileImage", user.photoURL);
            })
            .catch((error) => {
            // Handle errors here
            console.error('Google sign-in error: ', error);
    }); 
  };
  

export function createAccount(userID, displayName, idToken, setJwtToken, rawAccessToken, accessToken, setErrorMessage) {
    const endpoint = serverURL + 'create-account';
    const data = {
        userID: userID,
        displayName: displayName,
        rawAccessToken: rawAccessToken,
        accessToken: accessToken,
        idToken: idToken
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
        createCookie("jwtToken", data[0]["token"]);
        setJwtToken(data[0]["token"])
        // Set the accessTokens as cookies
        createCookie("accessToken", accessToken);
        createCookie("rawAccessToken", rawAccessToken);
    })
    .catch(error => {
        console.error('There was an error creating the account:', error);
        setErrorMessage("There was an error creating the account");
        // Handle error here
    });
}

export function signIn(userID, idToken, setJwtToken, rawAccessToken, accessToken, setErrorMessage) {
    const endpoint = serverURL + 'sign-in';
    const data = {
        userID: userID,
        rawAccessToken: rawAccessToken,
        accessToken: accessToken,
        idToken: idToken
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
        createCookie("jwtToken", data[0]["token"]);
        setJwtToken(data[0]["token"])
        // Set the accessTokens as cookies
        createCookie("accessToken", accessToken);
        createCookie("rawAccessToken", rawAccessToken);
    })
    .catch(error => {
        console.error('There was an error creating the account:', error);
        setErrorMessage("There was an error creating the account");
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

export function signUpWithEmail(email, password, displayName, setJwtToken, setErrorMessage) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address.');
        return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
            const user = result.user;
            await user.updateProfile({ displayName: displayName });
            const idToken = await user.getIdToken();
            
            createAccount(user.uid, displayName, idToken, setJwtToken, "test", "4be0643f-1d98-573b-97cd-ca98a65347dd", setErrorMessage);
            createCookie('userName', displayName);
        })
        .catch((error) => {
            setErrorMessage(getFirebaseErrorMessage(error.code));
        });
}

export function signInWithEmail(email, password, setJwtToken, setErrorMessage) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (result) => {
            const user = result.user;
            const idToken = await user.getIdToken();
            
            signIn(user.uid, idToken, setJwtToken, "test", "4be0643f-1d98-573b-97cd-ca98a65347dd", setErrorMessage);
            createCookie('userName', user.displayName || user.email);
        })
        .catch((error) => {
            setErrorMessage(getFirebaseErrorMessage(error.code));
        });
}

function getFirebaseErrorMessage(errorCode) {
    console.log("Firebase error code: " + errorCode);
    switch (errorCode) {
        case 'auth/email-already-in-use': return 'Email already registered. Try signing in';
        case 'auth/weak-password': return 'Password should be at least 6 characters';
        case 'auth/invalid-email': return 'Please enter a valid email address';
        case 'auth/user-not-found': return 'No account found with this email';
        case 'auth/invalid-credential': return 'Incorrect password/email address.';
        default: return 'An error occurred. Please try again';
    }
}

export function logOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
