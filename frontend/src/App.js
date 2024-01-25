import { React, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./screens/LandingPage";
import MainPage from "./screens/MainPage";
import { getCookie } from './api/Authentication';


function App() {
  const [userID, setUserID] = useState(getCookie("userID"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<MainPage userID={userID} setUserID={setUserID}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
