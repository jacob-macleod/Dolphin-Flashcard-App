import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { getTodayCardsFromStorage } from '../hooks/useTodayCards';
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
import Button from '../componments/Button';
import useWindowSize from '../hooks/useWindowSize';
import { TotalFlashcardBrowser } from '../containers/TotalFlashcardBrowser';
import DailyFlashcardBrowser from '../containers/DailyFlashcardBrowser';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import "../componments/Text/Link/Link.css";
import './ViewFlashcards.css';

function ViewFlashcards() {
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [mode, setMode] = useState("daily");
  const [todayCards, setTodayCards] = useState(getTodayCardsFromStorage());
  const [cardsPercentage, setCardsPercentage] = useState("0%");

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);
  const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";

  // Set general variables
  const title = "Study Flashcard";

  // Extract query parameters
  const location = useLocation();
  const { folder, flashcardName, flashcardID } = queryString.parse(location.search, { arrayFormat: 'bracket' });

const collectCardIDs = (cards, flashcardIDs) => {
  const cardIDs = [];

  const idsArray = Array.isArray(flashcardIDs)
    ? flashcardIDs
    : flashcardIDs
    ? [flashcardIDs]
    : [];

  const traverse = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (value && typeof value === "object") {
          if (
            idsArray.length > 0 &&
            value.flashcardID &&
            idsArray.includes(value.flashcardID)
          ) {
            if (value.cards) {
              cardIDs.push(...Object.keys(value.cards));
            }
          }
          traverse(value);
        }
      }
    }
  };

  traverse(cards);
  return cardIDs;
};

const cardIDs = collectCardIDs(todayCards || {}, flashcardID);

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
            paddingLeft: view !== "mobile" ? flashcardBoxHorizontalPadding : "",
            paddingRight: view !== "mobile" ? flashcardBoxHorizontalPadding : "",
            paddingTop: "0px",
            paddingBottom: view === "mobile" ? "0px" : "32px",
            width: view === "mobile" ? "100%" : "",
            display: view === "mobile" ? "block" : "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <MobilePageWrapper view={view} itemClicked="flashcards">
            <div className={view === "mobile" ? "mobile-page-container" : "desktop-page-container"}>

              <WhiteOverlay
                style={{
                  height: "max-content",
                  paddingBottom: view === "mobile" ? "80px" : "",
                  width: view === "desktop" ? "100%" : "calc(100% - 16px)"
                }}
                visible={view == "mobile" ? false : true}
              >
                <FlashcardHeader
                  newSet={false}
                  flashcardName={
                    flashcardName && flashcardName[0] ? flashcardName[0] : ""
                  }
                  folder={folder !== undefined ? folder[0] : undefined}
                  type={"studyFlashcard"}
                  flashcardID={flashcardID}
                  numberStudying={flashcardName ? flashcardName.length : 0}
                />
                <div style={{ maxWidth: "548px", margin: "auto" }}>
                  <div className="mode-selector-container">
                    <p
                      className={mode === "daily" ? "link" : "inactive-link"}
                      onClick={() => {
                        setMode("daily");
                      }}
                    >
                      Your Daily Dose
                    </p>
                    <p
                      className={mode === "total" ? "link" : "inactive-link"}
                      onClick={() => {
                        setMode("total");
                      }}
                    >
                      All Cards
                    </p>
                  </div>

                  <div className={view === "mobile" ? "study-mode-container" : ""}>
                    <Heading4 text={mode === "daily" ? "Regular study mode" : "All cards mode"} />
                    {view === "mobile" ? <Heading4 text={cardsPercentage} /> : <></>}
                  </div>

                  {mode === "daily"
                    ? <DailyFlashcardBrowser view={view} setCardsPercentage={setCardsPercentage} cardsPercentage={cardsPercentage}/>
                    : <TotalFlashcardBrowser
                        folder={folder}
                        flashcardName={flashcardName}
                        flashcardID={flashcardID}
                      />
                  }

                  <Heading4 text="Other modes" />
                  <div className={view === "mobile" ? "button-container-mobile" : 'button-container'}>
                    <Button text="Generate Quiz" disabled={true} view={view}/>
                    <Button text="Match Mode" disabled={true} view={view}/>
                  </div>
                </div>
              </WhiteOverlay>
            </div>
          </MobilePageWrapper>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default ViewFlashcards;
