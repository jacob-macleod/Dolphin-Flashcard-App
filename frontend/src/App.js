import { React, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './screens/SignIn';
import MainPage from "./screens/MainPage";
import Flashcards from './screens/Flashcards';
import EditFlashcard from './screens/EditFlashcard';
import ViewFlashcards from './screens/ViewFlashcards';
import PageNotFound from './screens/PageNotFound';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import { getCookie } from './api/Authentication';

function PromptLoginIfNotLoggedIn({ child, userID, setUserID }) {
  return (
    <>
      {userID ? child : <SignInPage setUserID={setUserID}/>}
    </>
  )
}

function ErrorChecking({ userID, setUserID, child }) {
  /* Add the ErrorBoundary and PromptLoginIfNotLoggedIn components */
  return (
    <ErrorBoundary>
      <PromptLoginIfNotLoggedIn child={child} userID={userID} setUserID={setUserID}/>
    </ErrorBoundary>
  )
}

function App() {
  const [userID, setUserID] = useState(getCookie("userID"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<SignInPage active={false}/>} />} />
          <Route path="/dashboard" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<MainPage userID={userID} setUserID={setUserID}/>} />} />
          <Route path="/flashcards" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<Flashcards />} />} />
          <Route path="/edit-flashcard-set" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<EditFlashcard />} />} />
          <Route path="/view" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<ViewFlashcards />} />} />
          <Route path="*" element={<ErrorChecking userID={userID} setUserID={setUserID} child={<PageNotFound />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
