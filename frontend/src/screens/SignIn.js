import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import firebase from 'firebase/compat/app';
import { signInWithGoogle, getCookie } from '../api/Authentication';
import BlobBackground from '../containers/BlobBackground';
import ErrorText from '../componments/Text/ErrorText';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import Header from '../componments/Text/Header/Header';
import Subheader from '../componments/Text/Subheader/Subheader';
import Image from '../componments/Image/Image';
import Paragraph from '../componments/Text/Paragraph/Paragraph';
import Button from '../componments/Button';
import DeveloperSection from '../componments/DeveloperSection';
import BentoPanel from '../containers/BentoPanel/BentoPanel';
import MailChimpWidget from '../containers/MailChimpWidget';
import goals from '../static/goals.png';
import heatmap from '../static/heatmap.png';
import card from '../static/card.png';
import cardEditor from '../static/card-editor.png';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './SignIn.css';

function SignInPage({ jwtToken, setJwtToken, active=true }) {
  const title = "Login";
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 878;
  const tabletBreakpoint = 1200;
  const [view, setView] = useState(width < mobileBreakpoint ? "mobile" : "desktop");
  const [signInErrorMessage, setSignInErrorMessage] = useState("");

  /*const goalsDesktopSize = {width: "465px", height: "465px"};
  const goalsTabletSize = {width: "310px", height: "310px"};
  const heatmapDesktopSize = {width: "560px", height: "355px"};
  const heatmapTabletSize = {width: "373px", height: "237px"};
  const cardDesktopSize = {width: "558px", height: "373px"};
  const cardTabletSize = {width: "372px", height: "249px"};*/

  const goalsDesktopSize = {width: "80%", height: "465px"};
  const goalsTabletSize = {width: "80%", height: "310px"};
  const heatmapDesktopSize = {width: "80%", height: "355px"};
  const heatmapTabletSize = {width: "80%", height: "237px"};
  const cardDesktopSize = {width: "80%", height: "373px"};
  const cardTabletSize = {width: "80%", height: "249px"};

  const queryParams = new URLSearchParams(location.search);

  // Set the accessTokens from the URL or cookies
  const [accessToken, setAccessToken] = useState(
    queryParams.get("idToken") == null ? getCookie("accessToken") : queryParams.get("idToken")
  );
  const [rawAccessToken, setRawAccessToken] = useState(
    queryParams.get("rawIdToken") == null ? getCookie("rawAccessToken") : queryParams.get("rawIdToken")
  );

  console.log(accessToken);
  console.log(rawAccessToken);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
  
    // Set the initial window size
    setWidth(window.innerWidth);
  
    // Set up the event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setView(width < mobileBreakpoint ? "mobile" : "desktop");
  }, [width]);

  function signIn() {
    // Initialise the firebase project and sign in with google
    // This should be fine to expose - if its not I need to resolve it ASAP
    firebase.initializeApp({
      "apiKey": "AIzaSyDHQNMbyP9qi3KqdymzauLb0wAP_aGrY-M",
      "authDomain": "dolphin-flashcards.firebaseapp.com",
      "databaseURL": "https://dolphin-flashcards-default-rtdb.europe-west1.firebasedatabase.app",
      "projectId": "dolphin-flashcards",
      "storageBucket": "dolphin-flashcards.appspot.com",
      "messagingSenderId": "481940183221",
      "appId": "1:481940183221:web:67bdc346eef4a5306286fc",
      "measurementId": "G-76Y8VTC390"
  });
    signInWithGoogle(setJwtToken, rawAccessToken, accessToken, setSignInErrorMessage);
  }

  const signInButton = active ?
    <div className='sign-in-button-wrapper'>
      <Button text="Continue with Google" onClick={ () => {
        if (accessToken == null || rawAccessToken == null) {
          setSignInErrorMessage("You need to sign in with a valid access link!")
        } else {
          signIn();
        }
      }}/>
      <ErrorText text={signInErrorMessage} />
    </div>
    : <Button text="Coming soon..." disabled={true} />

  return (
    <div style={{height: "fit-content"}}>
      <Helmet>
        <title>{ title }</title>
        <meta name="viewport" content="width=device-width, user-scalable=yes"></meta>
      </Helmet>

      <GridContainer layout="auto" classType="centered-grid-container">
        <div style={{width: "100%", height: "max-content"}}>
          <GridItem style={{
            width: "80%",
            margin: "auto",
          }}>
            <div style={{width: "75%", minWidth: "250px", maxWidth: "700px", margin: "auto", marginBottom: "32px"}}>
              <Image height="40px" width="40px" minWidth="40px"/>
              <Header text="Ready to start your learning journey?" />
              <Paragraph text="Dolphin flashcards is a totally brand-new flashcard app - with one goal: to be better than anyone else on the market. Sign in for free to become part of it." />
              {signInButton}
            </div>

            <MailChimpWidget view={view}/>

            <BentoPanel
              item1 = {<div>
                <Subheader text="Set goals, view them and see your progress - all in one place." />
                <Paragraph text="Setting goals? Important.
                  Tracking them and achieving them? Even more. With Dolphin Flashcards
                  you can easily view and track your goals so you never have to explain
                  why you missed your deadline." />
                {signInButton}</div>}
              item2 = {<Image
                width={width < tabletBreakpoint ? goalsTabletSize.width : goalsDesktopSize.width}
                minWidth="200px"
                height={"100%"}
                url={goals}
                objectFit="contain"
                marginTop="16px"/>}
              view={view}
              />

            <BentoPanel
            item1 = {<Image
              width={width < tabletBreakpoint ? heatmapTabletSize.width : heatmapDesktopSize.width}
              minWidth="200px"
              height={"100%"}
              url={heatmap}
              objectFit="contain"
            />}
            item2 = {
              <div>
                <Subheader text="Track & analyse your progress over time" />
                <Paragraph text="With an integrated view
                providing information on your streak and XP,
                Dolphin Flashcards makes it easy to be consistent with studying." />
                {signInButton}
              </div>
            }
            view={view}
            />

            <BentoPanel
              item1={<div>
                <Subheader text="Memorise effectively with our spaced-repetition algorithm" />
                <Paragraph text="Studying flashcards is vital.
                But remembering them long-term? Even more.
                That’s why we’ve built an effective spaced-repetition system to
                help you remember what you study long into the future." />
                {signInButton}
              </div>}
              item2={<Image
                width={width < tabletBreakpoint ? cardTabletSize.width : cardDesktopSize.width}
                minWidth="200px"
                height={width < tabletBreakpoint ? cardTabletSize.height : cardDesktopSize.height}
                url={card}
                objectFit="contain"
              />}
              view={view}
              style={{paddingBottom: "32px"}}
            />

            <BentoPanel
              item1={<Image
                width={width < tabletBreakpoint ? cardTabletSize.width : cardDesktopSize.width}
                minWidth="200px"
                height={"auto"}
                url={cardEditor}
                objectFit="contain"
              />}
              item2={<div>
                <Subheader text="Add images, colors and more to your flashcards with our integrated editor" />
                <Paragraph text="Our platform allows you to add images, colors, lists, bullet points
                and more to your flashcards, so you can improve your recall by introducing visuals
                to your flashcards." />
                {signInButton}
              </div>}
              view={view}
              overlayMarginBottom={"442px"}
            />
          </GridItem>
        <DeveloperSection />
      </div>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default SignInPage;
