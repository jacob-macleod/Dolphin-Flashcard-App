import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import Paragraph from '../componments/Text/Paragraph';
import { PreviewTotalFlashcardBrowser } from '../containers/TotalFlashcardBrowser';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './ViewFlashcards.css';
import './PreviewFlashcard.css';
import Heading4 from '../componments/Text/Heading4';
import Button from '../componments/Button';
import SaveFlashcardSetDialogue from '../containers/Modal/SaveFlashcardSetDialogue/SaveFlashcardSetDialogue';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

function PreviewFlashcard() {
  // Set general variables
  const title = "Preview";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  // Set variables for the size
  const mobileBreakpoint = 700;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view === "mobile" ? "8px" : "16px"
  );
  const [saveFlashcardSetDialogueVisible, setSaveFlashcardSetDialogueVisible] = useState(false);
  const [loadFlashcardInOwnSet, setLoadFlashcardInOwnSet] = useState(false);
  const [flashcardOwner, setFlashcardOwner] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setFlashcardBoxHorizontalPadding(view === "mobile" ? "8px" : "16px");
  }, [view]);

  useEffect(() => {
    if (loadFlashcardInOwnSet !== false) {
      setLoadFlashcardInOwnSet(false);
      window.open(
        "/view?flashcardID[]=" + urlParams.get("id") + "&folder[]=" + loadFlashcardInOwnSet + "&flashcardName[]=" + urlParams.get("name"),
        "_self"
      )
    }
  }, [loadFlashcardInOwnSet]);

  useEffect(() => {
    if (currentUser === "") {
      apiManager.getUserFromJwt(getCookie("jwtToken"), setCurrentUser);
    }
  }), [currentUser];

  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>

      <SaveFlashcardSetDialogue
        visible={saveFlashcardSetDialogueVisible}
        setVisible={setSaveFlashcardSetDialogueVisible}
        setReload={setLoadFlashcardInOwnSet}
      />

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
        {view !== "mobile" ? <SidePanel /> : <></>}

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
          {view === "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} /> : <></>}

          <WhiteOverlay
            style={{
              height: "max-content",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)",
            }}
          >
            <div className='top-bar'>
              <Paragraph
                text={urlParams.get("name")}
                type="grey-italics"
                style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}
              />
              <Paragraph
                text={flashcardOwner == "" ? "" : "by " + flashcardOwner.name}
                style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}
              />
              <Button
                text="Save Flashcard"
                onClick={() => {setSaveFlashcardSetDialogueVisible(true)}}
                disabled={currentUser.name === flashcardOwner.name ? true : false}
              />
            </div>

            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <Heading4 text="Previewing Flashcard" />

              <PreviewTotalFlashcardBrowser
                  flashcardID={urlParams.get("id")}
                  setFlashcardOwner={setFlashcardOwner}
                  flashcardOwner={flashcardOwner}
              />

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

export default PreviewFlashcard;
