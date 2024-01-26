import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import firebase from 'firebase/compat/app';
import { getConfig, signInWithGoogle } from '../api/Authentication';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import Image from '../componments/Image';
import Paragraph from '../componments/Paragraph';
import Button from '../componments/Button';
import WhiteOverlay from '../componments/WhiteOverlay';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function SignInPage({ userID, setUserID, active=true }) {
  const [apikey, setApikey] = useState(null);
  const title = "Login";

  // Get the API key
  useEffect(() => {
    getConfig(setApikey);
  }, []);

  const signInButton = active ? <Button text="Continue with Google" onClick={ () => {
      // Initialise the firebase project and sign in with google
      firebase.initializeApp(apikey);
      signInWithGoogle(setUserID);
    }}/> : <Button text="Coming soon..." disabled={true} />

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
        <GridItem style={{
          width: "70%",
          margin: "auto",
        }}>
          <Image width="35px" height="40px"/>
          <Header text="Ready to start your learning journey?" />
          <Paragraph text="Dolphin flashcards is a totally brand-new flashcard app - with one goal: to be better than anyone else on the market. Sign in for free to become part of it." />
          {signInButton}
          <WhiteOverlay style={{display: "inline-flex"}}>
            <div>
              <Header text="Set goals, view them and see your progress - all in one place." />
              <Paragraph text="Setting goals? Important.
                Tracking them and achieving them? Even more. With Dolphin Flashcards
                you can easily view and track your goals so you never have to explain
                why you missed your deadline." />
              {signInButton}
            </div>
                <Paragraph text="Image"/>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </>
  );
}

export default SignInPage;
