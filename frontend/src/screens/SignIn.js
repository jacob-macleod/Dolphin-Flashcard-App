import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import firebase from 'firebase/compat/app';
import { getConfig, signInWithGoogle } from '../api/Authentication';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import Subheader from '../componments/Subheader';
import Image from '../componments/Image';
import Paragraph from '../componments/Paragraph';
import Button from '../componments/Button';
import WhiteOverlay from '../componments/WhiteOverlay';
import DeveloperSection from '../componments/DeveloperSection';
import goals from '../static/goals.png';
import heatmap from '../static/heatmap.png';
import card from '../static/card.png';
import cardEditor from '../static/card-editor.png';
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
    <div style={{height: "fit-content"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout="auto" classType="centered-grid-container">
        <div style={{width: "100%", height: "max-content"}}>
          <GridItem style={{
            width: "70%",
            margin: "auto",
          }}>
            <Image width="35px" height="40px"/>
            <Header text="Ready to start your learning journey?" />
            <Paragraph text="Dolphin flashcards is a totally brand-new flashcard app - with one goal: to be better than anyone else on the market. Sign in for free to become part of it." />
            {signInButton}

            <WhiteOverlay style={{display: "inline-flex"}}>
              <div style={{width: "50%", padding: "16px", paddingLeft: "32px"}}>
                <Subheader text="Set goals, view them and see your progress - all in one place." />
                <Paragraph text="Setting goals? Important.
                  Tracking them and achieving them? Even more. With Dolphin Flashcards
                  you can easily view and track your goals so you never have to explain
                  why you missed your deadline." />
                {signInButton}
              </div>
                  <Image width='465px' height='465px' url={goals}/>
            </WhiteOverlay>

            <WhiteOverlay style={{display: "inline-flex"}}>
              <Image width='559px' height='356px' url={heatmap}/>

              <div style={{width: "50%", padding: "16px", paddingLeft: "32px"}}>
                <Subheader text="Track & analyse your progress over time" />
                <Paragraph text="With an integrated view
                providing information on your streak and XP,
                Dolphin Flashcards makes it easy to be consistent with studying." />
                {signInButton}
              </div>
            </WhiteOverlay>

            <WhiteOverlay style={{display: "inline-flex"}}>
              <div style={{width: "50%", padding: "16px", paddingLeft: "32px"}}>
                <Subheader text="Memorise effectively with our spaced-repetition algorithm" />
                <Paragraph text="Studying flashcards is vital.
                But remembering them long-term? Even more.
                That’s why we’ve built an effective spaced-repetition system to
                help you remember what you study long into the future." />
                {signInButton}
              </div>
                  <Image width='560px' height='355px' url={card}/>
            </WhiteOverlay>

            <WhiteOverlay style={{display: "inline-flex", marginBottom:"450px"}}>
              <Image width='558px' height='373px' url={cardEditor}/>

              <div style={{width: "50%", padding: "16px", paddingLeft: "32px"}}>
                <Subheader text="Add images, colors and more to your flashcards with our integrated editor" />
                <Paragraph text="Our platform allows you to add images, colors, lists, bullet points
                and more to your flashcards, so you can improve your recall by introducing visuals
                to your flashcards." />
                {signInButton}
              </div>
            </WhiteOverlay>

          </GridItem>
        <DeveloperSection />
      </div>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default SignInPage;
