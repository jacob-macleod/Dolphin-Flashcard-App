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


function App() {
  const [userID, setUserID] = useState(getCookie("userID"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ErrorBoundary><SignInPage active={false}/></ErrorBoundary>} />
          <Route path="/dashboard" element={<ErrorBoundary><MainPage userID={userID} setUserID={setUserID}/></ErrorBoundary>} />
          <Route path="/flashcards" element={<ErrorBoundary><Flashcards /></ErrorBoundary>} />
          <Route path="/edit-flashcard-set" element={<ErrorBoundary><EditFlashcard /></ErrorBoundary>} />
          <Route path="/view" element={<ErrorBoundary><ViewFlashcards /></ErrorBoundary>} />
          <Route path="*" element={<ErrorBoundary><PageNotFound /></ErrorBoundary>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
