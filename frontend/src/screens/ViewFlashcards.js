import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import FlashcardHeader from '../containers/FlashcardHeader';
import Heading4 from '../componments/Text/Heading4/Heading4';
import CardOverview from '../containers/CardOverview/CardOverview';
import Button from '../componments/Button';
import useWindowSize from '../hooks/useWindowSize';
import Paragraph from '../componments/Text/Paragraph';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';
import "../componments/Text/Link/Link.css";
import './ViewFlashcards.css';

function ViewFlashcards() {
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [mode, setMode] = useState("daily");

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);
  const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";

  // Set general variables
  const title = "Study Flashcard";

  // Extract query parameters
  const location = useLocation();
  const { folder, flashcardName } = queryString.parse(location.search, { arrayFormat: 'bracket' });

  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
        {view !== "mobile" ? <SidePanel selectedItem="flashcards" /> : <></>}

        <GridItem
          style={{
            paddingLeft: flashcardBoxHorizontalPadding,
            paddingRight: flashcardBoxHorizontalPadding,
            paddingTop: "0px",
            width: view === "mobile" ? "100vw" : "",
            display: view === "mobile" ? "block" : "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {view === "mobile" ? (
            <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards" />
          ) : (
            <></>
          )}

          <WhiteOverlay
            style={{
              height: "max-content",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)"
            }}
          >
            <FlashcardHeader newSet={false} flashcardName={flashcardName[0]} folder={folder[0]} type={"studyFlashcard"} />
            <div style={{ maxWidth: "548px", margin: "auto" }}>
              <div className='mode-selector-container'>
                <p className={mode === "daily" ? 'link' : "inactive-link"} onClick={() => { setMode("daily") }}>Your Daily Dose</p>
                <p className={mode === "total" ? 'link' : 'inactive-link'} onClick={() => { setMode("total") }}>All Cards</p>
              </div>

              <Heading4 text={mode === "daily" ? "Regular study mode" : "All cards mode"} />

              <CardOverview text="<strong>My card</strong> <p>My description</p>" showResponseOptions={mode === "daily"} showTurnOverButton={true} />

              <Paragraph text="10/12" type="grey" />
              <Heading4 text="Other modes" />
              <div className='button-container'>
                <Button text="Generate Quiz" disabled={true} />
                <Button text="Match Mode" disabled={true} />
              </div>
            </div>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default ViewFlashcards;
