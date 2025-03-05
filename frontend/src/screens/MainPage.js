import { React } from 'react';
import '../App.css';
import '../api/Authentication.js';
import Dashboard from './Dashboard';
import SignInPage from './SignIn';
import LandingPage from './LandingPage.js';

function MainPage({ jwtToken, setJwtToken }) {
  return jwtToken != null ? (
    <Dashboard setJwtToken={setJwtToken} />
  ) : (
    <LandingPage />
  );
}

export default MainPage;
