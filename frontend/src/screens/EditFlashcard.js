// Flashcards.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import NewFlashcardPopup from '../containers/Modal/NewFlashcardPopup/NewFlashcardPopup';
import FlashcardRow from '../containers/FlashcardRow';
import Button from '../componments/Button/Button';
import BoldParagraph from '../componments/Text/BoldParagraph/BoldParagraph';
import Heading5 from '../componments/Text/Heading5/Heading5';
import FlashcardHeader from '../containers/FlashcardHeader';
import FlashcardSearch from '../containers/FlashcardSearch';
import FlashcardSort from '../containers/FlashcardSort';
import useWindowSize from '../hooks/useWindowSize';
import useFlashcardData from '../hooks/useFlashcardData';
import DelayedElement from '../containers/DelayedElement';
import { getCookie } from '../api/Authentication';
import './EditFlashcard.css';
import '../containers/Modal/NewGoalPopup/NewGoalPopup.css';

function Flashcards() {
  const title = "Flashcards";
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [sortType, setSortType] = useState("most-recent");
  const [NewFlashcardPopupVisible, setNewFlashcardPopupVisible] = useState(false);
  const [editFlashcardPopupVisible, setEditFlashcardPopupVisible] = useState(false);
  const [initialTerm, setInitialTerm] = useState("");
  const [initialDefinition, setInitialDefinition] = useState("");
  const [cardsLoaded, setCardsLoaded] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newSet = queryParams.get('newSet');
  const flashcardID = queryParams.get('flashcardID');
  const flashcardName = queryParams.get('flashcardName');
  const folder = queryParams.get('folder');
  const description = queryParams.get('flashcardDescription');
  
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";

  const {
    flashcardData,
    flashcardsExist,
    flashcardItems,
    setFlashcardItems,
  } = useFlashcardData(newSet, folder, flashcardID, description, flashcardName);

  const handleOptionChange = (event) => setSortType(event.target.value);

  useEffect(() => {
    if (flashcardData === null) {
      setCardsLoaded(false);
    } else {
      setCardsLoaded(true);
    }
  }, [flashcardData]);

  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>

      <NewFlashcardPopup
        visible={NewFlashcardPopupVisible}
        setVisible={setNewFlashcardPopupVisible}
        view={view}
        flashcardData={flashcardData}
        flashcardItems={flashcardItems}
        setFlashcardItems={setFlashcardItems}
        folder={folder}
      />
      <NewFlashcardPopup
        visible={editFlashcardPopupVisible}
        setVisible={setEditFlashcardPopupVisible}
        view={view}
        flashcardData={flashcardData}
        flashcardItems={flashcardItems}
        setFlashcardItems={setFlashcardItems}
        folder={folder}
        editExistingFlashcard={true}
        initialTerm={initialTerm}
        initialDefinition={initialDefinition}
      />

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
        {view !== "mobile" && <SidePanel selectedItem="flashcards" />}

        <GridItem style={{
          paddingLeft: flashcardBoxHorizontalPadding,
          paddingRight: flashcardBoxHorizontalPadding,
          paddingTop: "0px",
          width: view === "mobile" ? "100vw" : "",
          display: view === "mobile" ? "block" : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
          {view === "mobile" && <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards" />}

          <WhiteOverlay
            style={{
              height: "max-content",
              padding: "16px",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)"
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <FlashcardHeader newSet={newSet} flashcardName={flashcardName} folder={folder} flashcardID={flashcardID}/>
              <FlashcardSearch view={view} />
              <FlashcardSort sortType={sortType} handleOptionChange={handleOptionChange} />

              <Button text="+ New Card" onClick={() => setNewFlashcardPopupVisible(true)} />

              <div className='two-column-text'>
                <BoldParagraph text="Term:" />
                <BoldParagraph text="Definition:" />
              </div>

              {
              flashcardData === null
                ? <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={null} />
                </div>
                : flashcardData.cards?.length !== 0
                  ? flashcardItems.map((item) => (
                    <FlashcardRow
                      key={item.id}
                      front={item.front}
                      back={item.back}
                      view={view}
                      showEditPopup={setEditFlashcardPopupVisible}
                      setInitialTerm={setInitialTerm}
                      setInitialDefinition={setInitialDefinition}
                    />
                  ))
                  : <Heading5 text="You don't have any flashcards yet!" style={{ margin: "8px" }} />
              }
            </div>
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default Flashcards;
