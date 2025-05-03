import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useTodayCards from '../hooks/useTodayCards';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './Flashcards.css';
import './Settings.css';
import GhostButton from '../componments/GhostButton';

import { useTheme } from '../context/ThemeContext';


function Settings() {
    // Set general variables
    const title = "Flashcards";

    // Set variables for the size
    const mobileBreakpoint = 650;
    const tabletBreakpoint = 1090;
    const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

    const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
        view === "mobile" ? "8px" : "16px"
    );
    const { darkMode, toggleTheme } = useTheme();


  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      </Helmet>

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
        {view !== "mobile" ? <SidePanel selectedItem="settings" /> : <></>}

        <GridItem
          style={{
            paddingLeft: view === "mobile" ? "0px" : flashcardBoxHorizontalPadding,
            paddingRight: view === "mobile" ? "0px" : flashcardBoxHorizontalPadding,
            paddingTop: "0px",
            paddingBottom: view === "mobile" ? "0px" : "",
            width: view === "mobile" ? "100vw" : "",
            display: view === "mobile" ? "block" : "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >


          <WhiteOverlay
            style={{
              height: "max-content",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)",
              padding: "0px",
            }}
            visible={view == "mobile" ? false : true}
            className="settings-page-wrapper"
          >
            <div style={{ maxWidth: "1200px", margin: "auto", padding: view === "mobile" ? "0px" : "16px", height: view === "mobile" ? "100%" : "", overflowY: "scroll" }}>
                <MobilePageWrapper view={view} itemClicked="settings">
                  <div>
                    <p>Settings</p>
                    <GhostButton 
                        text={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"} 
                        onClick={toggleTheme}
                    />
                </div>
              </MobilePageWrapper>
            </div>
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default Settings;
