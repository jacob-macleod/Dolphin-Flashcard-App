import { React, useState } from 'react';
import '../App.css';
import '../api/Authentication.js';
import Dashboard from './Dashboard';
import SignInPage from './SignIn';

function MainPage({ userID, setUserID }) {
    return (
        userID != null ? <Dashboard setUserID={setUserID}/> : <SignInPage userID={userID} setUserID={setUserID}/>
    );
}

export default MainPage;
