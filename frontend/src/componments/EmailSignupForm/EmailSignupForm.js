import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '../../api/Authentication';
import Button from '../Button';
import GhostButton from '../GhostButton';
import ErrorText from '../Text/ErrorText';

function EmailSignupForm({ setJwtToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: 'AIzaSyDHQNMbyP9qi3KqdymzauLb0wAP_aGrY-M',
                authDomain: 'dolphin-flashcards.firebaseapp.com',
                databaseURL: 'https://dolphin-flashcards-default-rtdb.europe-west1.firebasedatabase.app',
                projectId: 'dolphin-flashcards',
                storageBucket: 'dolphin-flashcards.appspot.com',
                messagingSenderId: '481940183221',
                appId: '1:481940183221:web:67bdc346eef4a5306286fc',
                measurementId: 'G-76Y8VTC390',
            });
        }
    }, []);

    const handleSignUp = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!displayName.trim()) {
            setErrorMessage('Please enter your name.');
            return;
        }

        signUpWithEmail(
            email,
            password,
            displayName,
            setJwtToken,
            setErrorMessage
        );
    };

    const handleSignIn = () => {
        setErrorMessage('');
        signInWithEmail(
            email,
            password,
            setJwtToken,
            setErrorMessage
        );
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <form
                onSubmit={handleSignUp}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                <input
                    type="text"
                    placeholder="Full Name (sign up only)"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
                />

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
                    required
                />

                {/*<div style={{ textAlign: 'right' }}>
                    <button
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#6366F1',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Forgot Password?
                    </button>
                </div>*/}

                {/* Sign up */}
                <Button text="Sign Up" type="submit" />

                {/* Sign in */}
                <GhostButton
                    text="Sign In"
                    type="button"
                    onClick={handleSignIn}
                    style={{
                        width: '100%',
                    }}
                />

                <GhostButton
                    text="Or, sign in with Google"
                    onClick={() =>
                        signInWithGoogle(setJwtToken, setErrorMessage, false)
                    }
                    style={{
                        width: '100%',
                    }}
                />

                <ErrorText text={errorMessage} />
            </form>
        </div>
    );
}

export default EmailSignupForm;
