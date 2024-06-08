import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import FlashcardOverview from '../containers/FlashcardOverview/FlashcardOverview';
import DelayedElement from '../containers/DelayedElement';
import Button from '../componments/Button';
import GhostButton from '../componments/GhostButton';
import SearchBar from '../componments/SearchBar/SearchBar';
import ReviewBarChartKey from '../containers/ReviewBarChartKey/ReviewBarChartKey';
import MoveFolderDialogue from '../containers/Modal/MoveFolderDialogue/MoveFolderDialogue';
import CreateFlashcardSetDialogue from '../containers/Modal/CreateFlashcardSetDialogue/CreateFlashcardSetDialogue';
import apiManager from '../api/Api';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import { getCookie } from '../api/Authentication';

function Flashcards() {
  // Set general variables
  const title = "Flashcards";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [moveFolderDialogueVisible, setMoveFolderDialogueVisible] = useState(false);
  const [reload, setReload] = useState(true);
  const [createCardDialogueVisible, setCreateCardDialogueVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );
  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view == "mobile" ? "8px" : "16px"
  );

  const [todayCards, setTodayCards] = useState(null);

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
      view == "mobile" ? "8px" : "16px"
    );
  }, [width]);

  useEffect(() => {
    if (reload) {
      setReload(false);
      apiManager.getTodayCards(getCookie("userID"), setTodayCards);
    }
  }, [reload]);

  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>
      <CreateFlashcardSetDialogue visible={createCardDialogueVisible} setVisible={setCreateCardDialogueVisible} view={view} setReload={setReload}/>
      <MoveFolderDialogue visible={moveFolderDialogueVisible} setVisible={setMoveFolderDialogueVisible} view={view} setReload={setReload}/>
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
            <div style={{maxWidth: "1200px", margin: "auto"}}>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} view={view}/>
              <br></br>
              <br></br>
              <GridContainer classType="review-bar-wrapper" layout={view == "desktop" ? "260px auto 80px" : "auto"}>
                {view == "desktop" ? <GridItem /> : <></>}
                <ReviewBarChartKey view={view}/>
                {view == "desktop" ? <GridItem /> : <></>}
              </GridContainer>
              <DelayedElement
                child={<FlashcardOverview flashcardData={todayCards} setMoveFolderDialogueVisible={setMoveFolderDialogueVisible} view={view}/>}
                childValue={todayCards}
              />
              <div style={{float: "left"}}>
                <GhostButton text="+ New Folder" style={{display: "inline-block", marginRight: "16px"}}/>
                <Button
                  text="+ New Set"
                  style={{display: "inline-block"}}
                  onClick={() => {
                    setCreateCardDialogueVisible(todayCards);
                  }}
                />
              </div>
            </div>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Flashcards;
