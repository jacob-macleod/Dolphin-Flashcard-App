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
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import FlashcardOverview from '../containers/FlashcardOverview/FlashcardOverview';
import DelayedElement from '../containers/DelayedElement';
import Button from '../componments/Button';
import GhostButton from '../componments/GhostButton';
import SearchBar from '../componments/SearchBar/SearchBar';
import ReviewBarChartKey from '../containers/ReviewBarChartKey/ReviewBarChartKey';
import MoveFolderDialogue from '../containers/Modal/MoveFolderDialogue/MoveFolderDialogue';
import CreateFlashcardSetDialogue from '../containers/Modal/CreateFlashcardSetDialogue/CreateFlashcardSetDialogue';
import DeleteFlashcardConfirmation from '../containers/Modal/DeleteFlashcardConfirmation';
import CreateFolderDialogue from '../containers/Modal/CreateFolderDialogue';
import RenameFlashcardSetPopup from '../containers/Modal/RenameFlashcardSetPopup';
import RenameFolderPopup from '../containers/Modal/RenameFolderPopup';
import DeleteFolderConfirmation from '../containers/Modal/DeleteFolderConfirmation';
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
  const [createFolderDialogueVisible, setCreateFolderDialogueVisible] = useState(false);
  const [deleteFlashcardConfirmationVisible, showDeleteFlashcardConfirmation] = useState(false);
  const [renameFlashcardSetPopupVisible, setRenameFlashcardSetPopupVisible] = useState(false);
  const [deleteFolderConfirmationVisible, setDeleteFolderConfirmationVisible] = useState(false);
  const [renameFolderPopupVisible, setRenameFolderPopupVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view === "mobile" ? "8px" : "16px"
  );

  useEffect(() => {
    setFlashcardBoxHorizontalPadding(view === "mobile" ? "8px" : "16px");
  }, [view]);

  const todayCards = useTodayCards(reload, setReload, apiManager, getCookie);

  function studyMultipleCards() {
    let urlPath = "";
  
    // Helper function to recursively find the flashcard ID and name
    const findFlashcard = (cards, pathParts, folderPath = "") => {
      if (pathParts.length === 0) {
        return null;
      }
      const currentPart = pathParts.shift();
      if (cards[currentPart]) {
        const newFolderPath = folderPath ? `${folderPath}/${currentPart}` : currentPart;
        if (pathParts.length === 0 && cards[currentPart].flashcardID && cards[currentPart].flashcardName) {
          return { 
            flashcardID: cards[currentPart].flashcardID, 
            flashcardName: cards[currentPart].flashcardName,
            folderPath: folderPath ? folderPath : ""
          };
        }
        return findFlashcard(cards[currentPart], pathParts, newFolderPath);
      }
      return null;
    };
  
    // Iterate through selected paths
    for (let card_path = 0; card_path < selected.length; card_path++) {
      const path = selected[card_path];
      const pathParts = path.split('/').filter(part => part !== '');
      const flashcard = findFlashcard(todayCards, pathParts);
  
      if (flashcard) {
        urlPath += `&flashcardID[]=${flashcard.flashcardID}&flashcardName[]=${flashcard.flashcardName}&folder[]=${flashcard.folderPath}`;
      } else {
        // The path was not found
      }
    }
    window.open(`/view?${urlPath}`, '_self');
  }  

  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>

      <CreateFlashcardSetDialogue visible={createCardDialogueVisible} setVisible={setCreateCardDialogueVisible} view={view} setReload={setReload} />
      <MoveFolderDialogue visible={moveFolderDialogueVisible} setVisible={setMoveFolderDialogueVisible} view={view} setReload={setReload} />
      <CreateFolderDialogue visible={createFolderDialogueVisible} setVisible={setCreateFolderDialogueVisible} view={view} setReload={setReload} />
      <DeleteFlashcardConfirmation visible={deleteFlashcardConfirmationVisible} setVisible={showDeleteFlashcardConfirmation} view={view} setReload={setReload} />
      <RenameFlashcardSetPopup visible={renameFlashcardSetPopupVisible} setVisible={setRenameFlashcardSetPopupVisible} view={view} setReload={setReload} />
      <DeleteFolderConfirmation visible={deleteFolderConfirmationVisible} setVisible={setDeleteFolderConfirmationVisible} view={view} setReload={setReload} />
      <RenameFolderPopup visible={renameFolderPopupVisible} setVisible={setRenameFolderPopupVisible} view={view} setReload={setReload} />

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
          {view === "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards" /> : <></>}

          <WhiteOverlay
            style={{
              height: "max-content",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} view={view} />
              <br></br>
              <br></br>
              <GridContainer classType="review-bar-wrapper" layout={view === "desktop" ? "260px auto 80px" : "auto"}>
                {view === "desktop" ? <GridItem /> : <></>}
                <ReviewBarChartKey view={view} />
                {view === "desktop" ? <GridItem /> : <></>}
              </GridContainer>
              <DelayedElement
                child={
                  <FlashcardOverview
                    flashcardData={todayCards}
                    setMoveFolderDialogueVisible={setMoveFolderDialogueVisible}
                    showDeleteFlashcardConfirmation={showDeleteFlashcardConfirmation}
                    setRenameFlashcardSetPopupVisible={setRenameFlashcardSetPopupVisible}
                    setDeleteFolderConfirmationVisible={setDeleteFolderConfirmationVisible}
                    setRenameFolderPopupVisible={setRenameFolderPopupVisible}
                    view={view}
                    selected={selected}
                    setSelected={setSelected}
                  />
                }
                childValue={todayCards}
              />
              <div style={{
                display: view !== "desktop" ? "block": "flex", 
                justifyContent: "space-between",
                paddingTop: "16px"
              }}>
                <div style={{float: view !== "mobile" ? "left" : "", display: view !== "desktop" ? "flex": "", }}>
                  <GhostButton
                    text="+ New Folder"
                    style={{display: view !== "mobile" ? "inline-block": "", marginRight: view !== "mobile" ? "16px": "", marginLeft: view === "mobile" ? "0px" : ""}}
                    onClick={() => {
                      setCreateFolderDialogueVisible(todayCards);
                    }}
                  />
                  <Button
                    text="+ New Set"
                    style={{display: view !== "mobile" ? "inline-block": "", marginLeft: view === "mobile" ? "0px" : ""}}
                    onClick={() => {
                      setCreateCardDialogueVisible(todayCards);
                    }}
                  />
                </div>
              
              <div style={{float: view !== "desktop" ? "": "right"}}>
                <Button
                  text="Study Multiple"
                  disabled={selected.length <= 1}
                  style={{
                    paddingTop: "11px",
                    paddingBottom: "11px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    marginLeft: view === "mobile" ? "0px" : ""
                  }}
                  onClick={studyMultipleCards}
                />
              </div>
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
