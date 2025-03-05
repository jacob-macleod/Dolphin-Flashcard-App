import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { signInWithGoogle, getCookie } from '../../api/Authentication';
import Button from '../Button';
import ErrorText from '../Text/ErrorText';

function signInButton({ setJwtToken, active = true }) {
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

  const [forceRecreate, setForceRecreate] = useState(
    queryParams.get('forceRecreate') == null
      ? false
      : queryParams.get('forceRecreate')
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

  const signInBtn = active ? (
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

  return signInBtn;
}

export default signInButton;
