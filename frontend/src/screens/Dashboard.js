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
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout="auto">
        <GridItem>
          <Header text="Dashboard Page" />
        </GridItem>
      </GridContainer>
    <BlobBackground />
    </>
  );
}

export default LandingPage;
