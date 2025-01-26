import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer';
import GridItem from '../componments/GridItem';
import Header from '../componments/Text/Header';
import Subheader from '../componments/Text/Subheader';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import Paragraph from '../componments/Text/Paragraph';
import MailChimpWidget from '../containers/MailChimpWidget';
import Mailchimp from '../componments/Mailchimp/Mailchimp';
import DolphinTitleLogo from '../componments/Logos/DolphinTitleLogo/DolphinTitleLogo';
import goals from '../static/goals.png';
import coffeeTable from '../static/coffee-table.png';
import cardSearch from '../static/card-search.png';
import heatmap from '../static/heatmap.png';
import card from '../static/card.png';
import cardEditor from '../static/card-editor.png';
import Image from '../componments/Image';
import BentoPanel from '../containers/BentoPanel/BentoPanel';
import Button from '../componments/Button';
import ErrorText from '../componments/Text/ErrorText';
import { signInWithGoogle, getCookie } from '../api/Authentication';
import firebase from 'firebase/compat/app';
import DeveloperSection from '../componments/DeveloperSection';

let mailChimpApiKey = '';

try {
  const { default: apiKey } = require('../../api/secretKeys');
  mailChimpApiKey = apiKey;
} catch (error) {
  console.error('Error loading mailChimpApiKey:', error);
}

function FeaturesBento({
  subheaderText,
  paragraphText,
  imageUrl,
  imageWidth,
  imageHeight,
  reverse,
  signInButton,
  view,
}) {
  const image = (
    <Image
      width={imageWidth}
      minWidth="200px"
      height={imageHeight}
      url={imageUrl}
      objectFit="contain"
    />
  );

  const text = (
    <div
      style={{
        textAlign: 'start',
        margin: view === 'mobile' ? '0 20px' : '0 60px 30px 60px',
      }}
    >
      <Subheader text={subheaderText} />
      <Paragraph
        text={paragraphText}
        style={{
          color: '#616583',
          textAlign: 'start',
          lineHeight: '30px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {signInButton}
      </div>
    </div>
  );
  return (
    <BentoPanel
      item1={reverse ? image : text}
      item2={reverse ? text : image}
      view={view}
    />
  );
}

function LandingPage({ active = true }) {
  const title = 'Dolphin Flashcards';
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 878;
  const tabletBreakpoint = 1200;
  const [view, setView] = useState(
    width < mobileBreakpoint ? 'mobile' : 'desktop'
  );

  const coffeeTableDesktopSize = { width: '80%', height: '532px' };
  const coffeeTableTabletSize = { width: '100%', height: '310px' };
  const goalsDesktopSize = { width: '80%', height: '465px' };
  const goalsTabletSize = { width: '100%', height: '100%' };
  const heatmapDesktopSize = { width: '100%', height: '100%' };
  const heatmapTabletSize = { width: '100%', height: '100%' };
  const cardDesktopSize = { width: '100%', height: '100%' };
  const cardTabletSize = { width: '80%', height: '249px' };
  const cardSearchDesktopSize = { width: '100%', height: '100%' };
  const cardSearchTabletSize = { width: '80%', height: '310px' };

  const [signInErrorMessage, setSignInErrorMessage] = useState('');

  const queryParams = new URLSearchParams(location.search);

  // Set the accessTokens from the URL or cookies
  const [accessToken, setAccessToken] = useState(
    queryParams.get('idToken') == null
      ? getCookie('accessToken')
      : queryParams.get('idToken')
  );
  const [rawAccessToken, setRawAccessToken] = useState(
    queryParams.get('rawIdToken') == null
      ? getCookie('rawAccessToken')
      : queryParams.get('rawIdToken')
  );

  function signIn() {
    // Initialise the firebase project and sign in with google
    // This should be fine to expose - if its not I need to resolve it ASAP
    firebase.initializeApp({
      apiKey: 'AIzaSyDHQNMbyP9qi3KqdymzauLb0wAP_aGrY-M',
      authDomain: 'dolphin-flashcards.firebaseapp.com',
      databaseURL:
        'https://dolphin-flashcards-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'dolphin-flashcards',
      storageBucket: 'dolphin-flashcards.appspot.com',
      messagingSenderId: '481940183221',
      appId: '1:481940183221:web:67bdc346eef4a5306286fc',
      measurementId: 'G-76Y8VTC390',
    });
    signInWithGoogle(
      setJwtToken,
      rawAccessToken,
      accessToken,
      setSignInErrorMessage,
      forceRecreate
    );
  }

  const signInButton = active ? (
    <div className="sign-in-button-wrapper">
      <Button
        text="Continue with Google"
        onClick={() => {
          if (accessToken == null || rawAccessToken == null) {
            setSignInErrorMessage(
              'You need to sign in with a valid access link!'
            );
          } else {
            signIn();
          }
        }}
      />
      <ErrorText text={signInErrorMessage} />
    </div>
  ) : (
    <Button text="Coming soon..." disabled={true} />
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>

      <GridContainer
        layout="auto"
        classType="centered-grid-container"
        style={{ marginTop: view === 'mobile' ? '40px' : '120px' }}
      >
        <GridItem
          style={{
            textAlign: 'left',
            width: view === 'mobile' ? 0.8 * width : 0.6 * width,
            display: 'flex',
            flexDirection: view === 'mobile' ? 'column-reverse' : 'row',
            justifyContent: 'center',
            // justifyContent: 'center',
            gap: view === 'mobile' ? '40px' : '80px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-end',
              width: view === 'mobile' ? undefined : 0.29 * width,
            }}
          >
            <Image
              width={'100%'}
              minWidth="200px"
              height={
                view === 'mobile'
                  ? '100%'
                  : width < tabletBreakpoint
                  ? coffeeTableTabletSize.height
                  : coffeeTableDesktopSize.height
              }
              url={coffeeTable}
              objectFit="contain"
            />
          </div>
          <div
            style={{
              width: view === 'mobile' ? undefined : 0.27 * width,
              height: '100%',
            }}
          >
            <DolphinTitleLogo />
            <Header
              text="Struggling to remember what you study?"
              style={{ fontWeight: 'bold', fontSize: '50px' }}
            />
            <Paragraph
              text="Flashcards can help, but they’re not fun to use. Dolphin Flashcards is being built from the ground up to actually make studying flashcards enjoyable - and even more effective! "
              style={{
                color: '#616583',
                textAlign: 'start',
                lineHeight: '30px',
              }}
            />

            <Paragraph
              text="Sign up to our newsletter to receive updates and be notified when we launch."
              style={{
                color: '#616583',
                textAlign: 'start',
                lineHeight: '30px',
              }}
            />
            <Mailchimp
              action={mailChimpApiKey}
              fields={[
                {
                  name: 'EMAIL',
                  placeholder: 'Enter Email',
                  type: 'email',
                  required: true,
                },
              ]}
              messages={{
                sending: 'Sending...',
                success: 'Thank you for subscribing!',
                error: 'An unexpected internal error has occurred',
                empty: 'You must write an e-mail',
                duplicate: 'Too many subscribe attempts for this email address',
                button: 'Submit',
              }}
              className="mailchimp-form"
            />
          </div>
        </GridItem>
        {/* Bento Panels */}
        <GridItem
          style={{
            margin: '0 auto',
            height: 'max-content',
            width: view === 'mobile' ? 0.8 * width : 0.6 * width,
          }}
        >
          <FeaturesBento
            subheaderText="Set goals, view them and see your progress - all in one place."
            paragraphText="Setting goals? Important.
                  Tracking them and achieving them? Even more. With Dolphin Flashcards
                  you can easily view and track your goals so you never have to explain
                  why you missed your deadline."
            imageUrl={goals}
            imageWidth={'100%'}
            imageHeight={
              width < tabletBreakpoint
                ? goalsTabletSize.height
                : goalsDesktopSize.height
            }
            reverse={false}
            signInButton={signInButton}
            view={view}
          />
          <FeaturesBento
            subheaderText="Track & analyse your progress over time"
            paragraphText="With an integrated view
                providing information on your streak and XP,
                Dolphin Flashcards makes it easy to be consistent with studying."
            imageUrl={heatmap}
            imageWidth={
              width < tabletBreakpoint
                ? heatmapTabletSize.width
                : heatmapDesktopSize.width
            }
            imageHeight={
              width < tabletBreakpoint
                ? heatmapTabletSize.height
                : heatmapDesktopSize.height
            }
            reverse={true}
            signInButton={signInButton}
            view={view}
          />
          <FeaturesBento
            subheaderText="Memorise effectively with our spaced-repetition algorithm"
            paragraphText="Studying flashcards is vital.
                But remembering them long-term? Even more.
                That’s why we’ve built an effective spaced-repetition system to
                help you remember what you study long into the future."
            imageUrl={card}
            imageWidth={
              width < tabletBreakpoint
                ? cardTabletSize.width
                : cardDesktopSize.width
            }
            imageHeight={
              width < tabletBreakpoint
                ? cardTabletSize.height
                : cardDesktopSize.height
            }
            reverse={false}
            signInButton={signInButton}
            view={view}
          />
          <FeaturesBento
            subheaderText="Add images, colors and more to your flashcards with our integrated editor"
            paragraphText="Our platform allows you to add images, colors, lists, bullet points
                and more to your flashcards, so you can improve your recall by introducing visuals
                to your flashcards."
            imageUrl={cardEditor}
            imageWidth={
              width < tabletBreakpoint
                ? cardTabletSize.width
                : cardDesktopSize.width
            }
            imageHeight={'auto'}
            reverse={true}
            signInButton={signInButton}
            view={view}
          />
          <FeaturesBento
            subheaderText="Search through our array of community-generated flashcard sets"
            paragraphText="Can’t be bothered to make your own flashcards? See if someone else has made something similar already."
            imageUrl={cardSearch}
            imageWidth={
              width < tabletBreakpoint
                ? cardSearchTabletSize.width
                : cardSearchDesktopSize.width
            }
            imageHeight={'auto'}
            reverse={false}
            signInButton={signInButton}
            view={view}
          />
        </GridItem>

        <GridItem>
          <div>
            <Subheader
              text="Our goal? To design the best
              flashcard app ever by prioritizing
              users and their goals."
            />

            <p class="text">
              We aim to launch in mid-2024. Want to learn more? Check out our{' '}
              <a
                href="https://github.com/jacob-macleod/Flashcard-App"
                class="link"
              >
                Github Page!
              </a>
            </p>

            <p class="text">
              <span class="bold">Designer: </span>
              <a href="https://github.com/nathan-a-macleod" class="link">
                Nathan MacLeod
              </a>
            </p>

            <p class="text">
              <span class="bold">Developer: </span>
              <a href="https://github.com/jacob-macleod" class="link">
                Jacob MacLeod
              </a>
            </p>
          </div>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </>
  );
}

export default LandingPage;
