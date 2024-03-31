import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import SidePanel from '../containers/SidePanel';
import Heading4 from '../componments/Heading4';
import WhiteOverlay from '../componments/WhiteOverlay';
import HamburgerBar from '../componments/HamburgerBar';
import FlashcardOverview from '../containers/FlashcardOverview';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Flashcards() {
  // Set general variables
  const title = "Flashcards";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 700;
  const tabletBreakpoint = 1000;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );
  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view == "mobile" ? "0px" : "16px"
  );

  const tempCardData = [
    {
      "back": "Back 1",
      "flashcardName": "My new set",
      "front": "Front 1",
      "lastReview": "30/03/2024",
      "reviewStatus": "0.0"
    },
    {
      "back": "Back 2",
      "flashcardName": "My new set",
      "front": "Front 2",
      "lastReview": "30/03/2024",
      "reviewStatus": "0.0"
    },
    {
      "back": "Back 1",
      "flashcardName": "Set two",
      "front": "Front 1",
      "lastReview": "30/03/2024",
      "reviewStatus": "0.0"
    },
    {
      "back": "Back 2",
      "flashcardName": "Set two",
      "front": "Front 2",
      "lastReview": "30/03/2024",
      "reviewStatus": "0.0"
    }
  ]

  // Manage resizing the window size when needed
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
  
    // Set the initial window size
    setWidth(window.innerWidth);
  
    // Set up the event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setView(
      width < mobileBreakpoint ? "mobile"
      : width < tabletBreakpoint ? "tablet" : "desktop");
    setFlashcardBoxHorizontalPadding(
      view == "mobile" ? "0px" : "16px"
    );
  }, [width]);

  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout={
        view != "mobile" ? "240px auto"
        : "auto"
      } classType="two-column-grid">
        {view != "mobile" ? <SidePanel selectedItem="flashcards"/> : <></>}

        <GridItem style={{paddingLeft: flashcardBoxHorizontalPadding, paddingRight: flashcardBoxHorizontalPadding, paddingTop: "0px", width: view == "mobile" ? "100vw" : ""}}>
          {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards"/> : <></>}
  
          <WhiteOverlay style={{height: "max-content"}}>
            <Heading4 text="Flashcards" />
            <FlashcardOverview flashcardData={tempCardData} />
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Flashcards;
