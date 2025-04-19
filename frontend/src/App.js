import { React, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './screens/SignIn';
import MainPage from './screens/MainPage';
import Flashcards from './screens/Flashcards';
import EditFlashcard from './screens/EditFlashcard';
import ViewFlashcards from './screens/ViewFlashcards';
import PageNotFound from './screens/PageNotFound';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import SearchForFlashcard from './screens/Community';
import PreviewFlashcard from './screens/PreviewFlashcard';
import { getCookie } from './api/Authentication';
import LandingPage from './screens/LandingPage';
import { ThemeProvider } from './context/ThemeContext';
import Settings from './screens/Settings';

function PromptLoginIfNotLoggedIn({ child, jwtToken, setJwtToken }) {
  /* If there is no JWT Token, display the landing page - the user can access sign in from there.*/
  return (
    <>
      {/* {jwtToken ? child : <SignInPage setJwtToken={setJwtToken} />} */}
      {jwtToken ? child : <LandingPage setJwtToken={setJwtToken} />}
    </>
  );
}

function ErrorChecking({ jwtToken, setJwtToken, child }) {
  /* Add the ErrorBoundary and PromptLoginIfNotLoggedIn components */
  return (
    <ErrorBoundary>
      <PromptLoginIfNotLoggedIn
        child={child}
        jwtToken={jwtToken}
        setJwtToken={setJwtToken}
      />
    </ErrorBoundary>
  );
}

function App() {
  // const [jwtToken, setJwtToken] = useState('4be0643f-1d98-573b-97cd-ca98a65347dd');
  const [jwtToken, setJwtToken] = useState(getCookie('jwtToken'));

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={
                  <MainPage jwtToken={jwtToken} setJwtToken={setJwtToken} />
                }
              />
            }
          />
          {/* User is allowed to log in without a JWT Token */}
          <Route
            path="/login"
            element={
              <SignInPage jwtToken={jwtToken} setJwtToken={setJwtToken} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={
                  <MainPage jwtToken={jwtToken} setJwtToken={setJwtToken} />
                }
              />
            }
          />
          <Route
            path="/flashcards"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={<Flashcards />}
              />
            }
          />
          <Route
            path="/edit-flashcard-set"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={<EditFlashcard />}
              />
            }
          />
          <Route
            path="/view"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={<ViewFlashcards />}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <ErrorChecking
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                child={<Settings />}
              />
            }
          />
          <Route path="/community" element={<SearchForFlashcard />} />
          <Route path="/preview" element={<PreviewFlashcard />} />
          {/* Do not check if the user is signed in or not, because 404 pages can be accessed without jwt tokens */}
          <Route
            path="*"
            element={
              <PageNotFound />
              // <ErrorChecking
              //   jwtToken={jwtToken}
              //   setJwtToken={setJwtToken}
              //   child={<PageNotFound />}
              // />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
