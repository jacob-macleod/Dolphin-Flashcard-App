import React from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import Subheader from '../componments/Subheader';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function LandingPage() {
  const title = "Dolphin Flashcards";

  return (
    <>
      <Helmet>
        <title>{ title }</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout="auto">
        <GridItem style={{
          height: "600px",
        }}>
          <Header text="We’re launching soon..." />
          <Subheader
          text="Our goal? To design the best
            flashcard app ever by prioritizing
            users and their goals."
          />

        <p class="text">
          We aim to launch in mid-2024.
          Want to learn more? Check out our <a
            href="https://github.com/jacob-macleod/Flashcard-App"
            class="link">
             Github Page!
          </a>
        </p>

        <p class="text">
          <span class="bold">Designer: </span>
          <a href="https://github.com/nathan-a-macleod" class="link">
            Nathan MacLeod
          </a>
        </p>

        <p class="text">
          <span class="bold">Developer: </span>
          <a href="https://github.com/jacob-macleod" class="link">
            Jacob MacLeod
          </a>
        </p>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </>
  );
}

export default LandingPage;
