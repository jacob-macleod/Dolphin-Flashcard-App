import {React, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import FlashcardHeader from '../containers/FlashcardHeader';
import useWindowSize from '../hooks/useWindowSize';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

function ViewFlashcards() {
    const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  
    // Set variables for the size
    const mobileBreakpoint = 650;
    const tabletBreakpoint = 1090;
    const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);
    const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";

    // Set general variables
    const title = "Study Flashcard";

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

        <GridItem style={{
          paddingLeft: flashcardBoxHorizontalPadding,
          paddingRight: flashcardBoxHorizontalPadding,
          paddingTop: "0px",
          width: view == "mobile" ? "100vw" : "",
          display: view == "mobile" ? "block" : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards"/> : <></>}
  
          <WhiteOverlay
            style={{
                height: "max-content",
                paddingBottom: view == "mobile" ? "80px" : "",
                width: view == "desktop" ? "100%" : "calc(100% - 16px)"
              }}
            >
                <FlashcardHeader newSet={false} flashcardName={"My Flashcard"} folder={"\"My folder"} type={"studyFlashcard"}/>
                <div style={{maxWidth: "1200px", margin: "auto"}}>
                </div>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default ViewFlashcards;
