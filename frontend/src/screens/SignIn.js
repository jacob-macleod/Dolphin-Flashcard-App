import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import firebase from 'firebase/compat/app';
import { signInWithGoogle } from '../api/Authentication';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import Subheader from '../componments/Subheader';
import Image from '../componments/Image';
import Paragraph from '../componments/Paragraph';
import Button from '../componments/Button';
import DeveloperSection from '../componments/DeveloperSection';
import BentoPanel from '../containers/BentoPanel';
import goals from '../static/goals.png';
import heatmap from '../static/heatmap.png';
import card from '../static/card.png';
import cardEditor from '../static/card-editor.png';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function SignInPage({ userID, setUserID, active=true }) {
  const title = "Login";
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 878;
  const tabletBreakpoint = 1200;
  const [view, setView] = useState(width < mobileBreakpoint ? "mobile" : "desktop");

  const goalsDesktopSize = {width: "465px", height: "465px"};
  const goalsTabletSize = {width: "310px", height: "310px"};
  const heatmapDesktopSize = {width: "560px", height: "355px"};
  const heatmapTabletSize = {width: "373px", height: "237px"};
  const cardDesktopSize = {width: "558px", height: "373px"};
  const cardTabletSize = {width: "372px", height: "249px"};


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
    console.log(width < mobileBreakpoint ? "mobile" : "desktop")
    console.log(" width " + width)
  }, [width]);

  const signInButton = active ? <Button text="Continue with Google" onClick={ () => {
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
      signInWithGoogle(setUserID);
    }}/> : <Button text="Coming soon..." disabled={true} />

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
            <div style={{width: "50%", minWidth: "400px", maxWidth: "700px", margin: "auto", marginBottom: "32px"}}>
              <Image width="35px" height="40px"/>
              <Header text="Ready to start your learning journey?" />
              <Paragraph text="Dolphin flashcards is a totally brand-new flashcard app - with one goal: to be better than anyone else on the market. Sign in for free to become part of it." />
              {signInButton}
            </div>

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
                height={width < tabletBreakpoint ? goalsTabletSize.height : goalsDesktopSize.height}
                url={goals}
                objectFit="contain"/>}
              view={view}
              />

            <BentoPanel
            item1 = {<Image
              width={width < tabletBreakpoint ? heatmapTabletSize.width : heatmapDesktopSize.width}
              height={width < tabletBreakpoint ? heatmapTabletSize.height : heatmapDesktopSize.height}
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
                height={width < tabletBreakpoint ? cardTabletSize.height : cardDesktopSize.height}
                url={card}
                objectFit="contain"
              />}
              view={view}
            />

            <BentoPanel
              item1={<Image
                width={width < tabletBreakpoint ? cardTabletSize.width : cardDesktopSize.width}
                height={width < tabletBreakpoint ? cardTabletSize.height : cardDesktopSize.height}
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
