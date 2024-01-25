import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import firebase from 'firebase/compat/app';
import { getConfig, signInWithGoogle } from '../api/Authentication';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function SignInPage({ userID, setUserID }) {
  const [apikey, setApikey] = useState(null);
  const title = "Login";

  // Get the API key
  useEffect(() => {
    getConfig(setApikey);
  }, []);

  return (
    <>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout="auto" classType="centered-grid-container">
        <GridItem>
          <Header text="Ready to start your learning journey?" />

          <button onClick={ () => {
              // Initialise the firebase project and sign in with google
              firebase.initializeApp(apikey);
              signInWithGoogle(setUserID);
          }}>Continue with Google</button>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </>
  );
}

export default SignInPage;
