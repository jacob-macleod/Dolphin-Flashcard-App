import { React } from 'react';
import '../App.css';
import '../api/Authentication.js';
import Dashboard from './Dashboard';
import SignInPage from './SignIn';

function MainPage({ jwtToken, setJwtToken }) {
    return (
        jwtToken != null ? <Dashboard setJwtToken={setJwtToken}/> : <SignInPage jwtToken={jwtToken} setJwtToken={setJwtToken}/>
    );
}

export default MainPage;
