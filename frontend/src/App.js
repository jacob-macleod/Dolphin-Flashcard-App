import { React, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './screens/SignIn';
import MainPage from "./screens/MainPage";
import Flashcards from './screens/Flashcards';
import EditFlashcard from './screens/EditFlashcard';
import ViewFlashcards from './screens/ViewFlashcards';
import PageNotFound from './screens/PageNotFound';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import SearchForFlashcard from './screens/Community';
import { getCookie } from './api/Authentication';

function PromptLoginIfNotLoggedIn({ child, jwtToken, setJwtToken }) {
  return (
    <>
      {jwtToken ? child : <SignInPage setJwtToken={setJwtToken}/>}
    </>
  )
}

function ErrorChecking({ jwtToken, setJwtToken, child }) {
  /* Add the ErrorBoundary and PromptLoginIfNotLoggedIn components */
  return (
    <ErrorBoundary>
      <PromptLoginIfNotLoggedIn child={child} jwtToken={jwtToken} setJwtToken={setJwtToken}/>
    </ErrorBoundary>
  )
}

function App() {
  const [jwtToken, setJwtToken] = useState(getCookie("jwtToken"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<MainPage jwtToken={jwtToken} setJwtToken={setJwtToken}/>} />
            } />
          <Route path="/dashboard" element={<ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<MainPage jwtToken={jwtToken} setJwtToken={setJwtToken}/>} />} />
          <Route path="/flashcards" element={<ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<Flashcards />} />} />
          <Route path="/edit-flashcard-set" element={<ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<EditFlashcard />} />} />
          <Route path="/view" element={<ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<ViewFlashcards />} />} />
          <Route path="/community" element={<SearchForFlashcard />} />
          <Route path="*" element={<ErrorChecking jwtToken={jwtToken} setJwtToken={setJwtToken} child={<PageNotFound />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
