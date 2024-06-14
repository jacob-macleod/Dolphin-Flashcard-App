import { React, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './screens/SignIn';
import MainPage from "./screens/MainPage";
import Flashcards from './screens/Flashcards';
import EditFlashcard from './screens/EditFlashcard';
import StudyFlashcard from './screens/StudyFlashcard';
import { getCookie } from './api/Authentication';


function App() {
  const [userID, setUserID] = useState(getCookie("userID"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage active={false}/>} />
          <Route path="/dashboard" element={<MainPage userID={userID} setUserID={setUserID}/>} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/edit-flashcard-set" element={<EditFlashcard />} />
          <Route path="/study" element={<StudyFlashcard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
