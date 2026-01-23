import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../../../componments/Button';
import GhostButton from '../../../componments/GhostButton';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph/Paragraph';
import ErrorText from '../../../componments/Text/ErrorText';
import { 
  signInWithEmailAndPassword, 
  createAccountWithEmailAndPassword, 
  validatePassword 
} from '../../../api/Authentication';
import '../NewGoalPopup/NewGoalPopup.css';

function EmailAuthModal({ visible, setVisible, view, setJwtToken, setSignInErrorMessage, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrorMessage('');
    
    if (isSignUp && newPassword.length > 0) {
      const validation = validatePassword(newPassword);
      setPasswordErrors(validation.errors);
      setShowPasswordErrors(newPassword.length > 0);
    } else {
      setPasswordErrors([]);
      setShowPasswordErrors(false);
    }
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password validation for sign up
    if (isSignUp) {
      const validation = validatePassword(password);
      if (!validation.isValid) {
        setErrorMessage('Password does not meet requirements');
        setShowPasswordErrors(true);
        return;
      }
    }

    if (isSignUp) {
      createAccountWithEmailAndPassword(
        email,
        password,
        displayName || email.split('@')[0],
        setJwtToken,
        (error) => {
          setErrorMessage(error);
          setSignInErrorMessage(error);
        }
      );
    } else {
      signInWithEmailAndPassword(
        email,
        password,
        setJwtToken,
        (error) => {
          setErrorMessage(error);
          setSignInErrorMessage(error);
        }
      );
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setDisplayName('');
    setErrorMessage('');
    setPasswordErrors([]);
    setShowPasswordErrors(false);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setErrorMessage('');
    setPasswordErrors([]);
    setShowPasswordErrors(false);
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const buttonStyle = {
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
    marginBottom: '8px',
    width: view === 'mobile' ? 'calc(100% - 16px)' : 'auto',
  };

  return (
    <Modal visible={visible} view={view} style={{ height: 'fit-content', width: '100%', maxWidth: '500px' }}>
      <Heading3 text={isSignUp ? 'Create Account' : 'Sign In'} />
      <Paragraph text={isSignUp ? 'Create a new account with your email and password' : 'Sign in with your email and password'} />
      
      <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
        {isSignUp && (
          <div className={view !== 'mobile' ? 'input-container' : 'input-container-mobile'}>
            <Paragraph text="Display Name: " style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }} />
            <input
              type="text"
              className={view !== 'mobile' ? 'input' : 'input-mobile'}
              value={displayName}
              onChange={handleDisplayNameChange}
              placeholder="Optional"
              style={{ width: view !== 'mobile' ? 'calc(100% - 32px)' : 'calc(100% - 32px)' }}
            />
          </div>
        )}

        <div className={view !== 'mobile' ? 'input-container' : 'input-container-mobile'}>
          <Paragraph text="Email: " style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }} />
          <input
            type="email"
            className={view !== 'mobile' ? 'input' : 'input-mobile'}
            value={email}
            onChange={handleEmailChange}
            placeholder="your.email@example.com"
            required
            style={{ width: view !== 'mobile' ? 'calc(100% - 32px)' : 'calc(100% - 32px)' }}
          />
        </div>

        <div className={view !== 'mobile' ? 'input-container' : 'input-container-mobile'}>
          <Paragraph text="Password: " style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }} />
          <input
            type="password"
            className={view !== 'mobile' ? 'input' : 'input-mobile'}
            value={password}
            onChange={handlePasswordChange}
            placeholder={isSignUp ? "Enter a strong password" : "Enter your password"}
            required
            style={{ width: view !== 'mobile' ? 'calc(100% - 32px)' : 'calc(100% - 32px)' }}
          />
        </div>

        {isSignUp && showPasswordErrors && passwordErrors.length > 0 && (
          <div style={{ marginTop: '8px', marginBottom: '8px', paddingLeft: view === 'mobile' ? '28px' : '0px' }}>
            <Paragraph text="Password requirements:" style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }} />
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
              {passwordErrors.map((error, index) => (
                <li key={index} style={{ color: '#d32f2f', marginBottom: '4px' }}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isSignUp && password.length > 0 && passwordErrors.length === 0 && (
          <div style={{ marginTop: '8px', marginBottom: '8px', paddingLeft: view === 'mobile' ? '28px' : '0px' }}>
            <Paragraph text="✓ Password meets all requirements" style={{ fontSize: '14px', color: '#2e7d32' }} />
          </div>
        )}

        <ErrorText text={errorMessage} style={{ display: errorMessage ? 'block' : 'none', marginTop: '8px' }} />

        <div style={{ display: 'flex', flexDirection: view === 'mobile' ? 'column' : 'row', justifyContent: 'flex-end', marginTop: '24px', gap: '8px' }}>
          <GhostButton
            text="Cancel"
            onClick={handleClose}
            style={buttonStyle}
            view={view}
          />
          <Button
            text={isSignUp ? 'Create Account' : 'Sign In'}
            onClick={handleSubmit}
            style={buttonStyle}
            view={view}
          />
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Paragraph text={isSignUp ? 'Already have an account? ' : "Don't have an account? "} />
          <button
            type="button"
            onClick={handleToggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#6A84C5',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '16px',
              fontFamily: 'Roboto',
              padding: '0',
              marginLeft: '4px',
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EmailAuthModal;

