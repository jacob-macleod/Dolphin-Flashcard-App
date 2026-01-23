import React, { useState } from 'react';
import { motion } from 'framer-motion';
import firebase from 'firebase/compat/app';
import { signInWithGoogle } from '../../../api/Authentication';
import { dropIn } from '../../../animations/animations';
import Button from '../../../componments/Button';
import GhostButton from '../../../componments/GhostButton';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph/Paragraph';
import EmailAuthModal from '../EmailAuthModal/EmailAuthModal';

function AuthMethodModal({ visible, setVisible, view, setJwtToken, setSignInErrorMessage, forceRecreate }) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  function handleGoogleSignIn() {
    // Initialize Firebase if not already initialized
    if (firebase.apps.length === 0) {
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
    }
    
    signInWithGoogle(
      setJwtToken,
      setSignInErrorMessage,
      forceRecreate
    );
    setVisible(false);
  }

  function handleEmailSignIn() {
    setShowEmailModal(true);
  }

  const buttonStyle = {
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
    marginBottom: '8px',
    width: view === 'mobile' ? 'calc(100% - 16px)' : 'auto',
  };

  return (
    <>
      {visible && !showEmailModal && (
        <div 
          className={view !== "mobile" ? 'darken-background' : 'whiten-background'}
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              setVisible(false);
            }
          }}
        >
          <motion.div
            className={view === "desktop" ? "popup-container" : view === "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
            initial={view !== "mobile" ? "hidden" : ""}
            animate={view !== "mobile" ? "visible" : ""}
            exit={view !== "mobile" ? "exit" : ""}
            variants={view !== "mobile" ? dropIn : null}
            style={{ height: 'fit-content', width: '100%', maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Heading3 text="Choose a sign-in method" />
            <Paragraph text="Select how you'd like to sign in to your account." />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              <Button
                text="Continue with Google"
                onClick={handleGoogleSignIn}
                style={buttonStyle}
                view={view}
              />
              <Button
                text="Sign In With Email"
                onClick={handleEmailSignIn}
                style={buttonStyle}
                view={view}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <GhostButton
                text="Cancel"
                onClick={() => setVisible(false)}
                style={buttonStyle}
                view={view}
              />
            </div>
          </motion.div>
        </div>
      )}
      
      <EmailAuthModal
        visible={showEmailModal}
        setVisible={setShowEmailModal}
        view={view}
        setJwtToken={setJwtToken}
        setSignInErrorMessage={setSignInErrorMessage}
        onClose={() => {
          setShowEmailModal(false);
          setVisible(false);
        }}
      />
    </>
  );
}

export default AuthMethodModal;

