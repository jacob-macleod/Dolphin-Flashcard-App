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

  const tempCardData = {
    "52272457808457097202150182802279568600981162709146454156018710017387336764017": {
      "cards": {
        "0": {
          "back": "Back 1",
          "front": "Front 1",
          "lastReview": "30/03/2024",
          "reviewStatus": "0.0"
        },
        "1": {
          "back": "Back 2",
          "front": "Front 2",
          "lastReview": "30/03/2024",
          "reviewStatus": "0.0"
        }
      },
      "flashcardDescription": "This is the second set I've made",
      "flashcardID": "52272457808457097202150182802279568600981162709146454156018710017387336764017",
      "flashcardName": "Set two"
    },
    "78706522606884094347267331340740459328628093524759979664863269402823009149302": {
      "cards": {
        "0": {
          "back": "Back 1",
          "front": "Front 1",
          "lastReview": "30/03/2024",
          "reviewStatus": "0.0"
        },
        "1": {
          "back": "Back 2",
          "front": "Front 2",
          "lastReview": "30/03/2024",
          "reviewStatus": "0.0"
        }
      },
      "flashcardDescription": "This is\nmy description",
      "flashcardID": "78706522606884094347267331340740459328628093524759979664863269402823009149302",
      "flashcardName": "My new set"
    },
    "languages": {
      "35327435524706219408006451834813169054434248079692846228662623660367296560356": {
        "cards": {
          "0": {
            "back": "Back 1",
            "front": "Front 1",
            "lastReview": "28/03/2024",
            "reviewStatus": "0.0"
          },
          "1": {
            "back": "Back 2",
            "front": "Front 2",
            "lastReview": "28/03/2024",
            "reviewStatus": "0.0"
          }
        },
        "flashcardDescription": "This is\nmy description",
        "flashcardID": "35327435524706219408006451834813169054434248079692846228662623660367296560356",
        "flashcardName": "My new set"
      },
      "spanish": {
        "common-words": {
          "47962680440219262426614851383681058904567080607728983184879622214761420733776": {
            "cards": {
              "0": {
                "back": "Back 1",
                "front": "Front 1",
                "lastReview": "28/03/2024",
                "reviewStatus": "0.1"
              },
              "1": {
                "back": "Back 2",
                "front": "Front 2",
                "lastReview": "28/03/2024",
                "reviewStatus": "2.0"
              }
            },
            "flashcardDescription": "This is\nmy description",
            "flashcardID": "47962680440219262426614851383681058904567080607728983184879622214761420733776",
            "flashcardName": "My new set"
          }
        }
      }
    }
  }

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
