import logo from './logo.svg';
import './App.css';
import BlobBackground from './componments/BlobBackground';

function App() {
  return (
    <>
      <div id="content" style={{position: "absolute", zIndex: "1", width: "maxWidth"}}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          jutifyContent: "center",
          height: "100vh",
          margin: "32px",
        }}>
            <p class="header">We’re launching soon...</p>
            <p class="subheader">Our goal? To design the best flashcard app ever by prioritizing users and their goals.</p>
            <p class="text">We aim to launch in mid-2024. Want to learn more? Check out our <a href="https://github.com/jacob-macleod/Flashcard-App" class="link">Github Page!</a></p>
            <p class="text"><span class="bold">Designer:</span> <a href="https://github.com/nathan-a-macleod" class="link">Nathan MacLeod</a></p>
            <p class="text"><span class="bold">Developer:</span> <a href="https://github.com/jacob-macleod" class="link">Jacob MacLeod</a></p>
        </div>            
    </div>
      <BlobBackground />
    </>
  );
}

export default App;
