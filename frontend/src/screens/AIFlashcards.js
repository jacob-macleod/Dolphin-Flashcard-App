import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useTodayCards from '../hooks/useTodayCards';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import FlashcardOverview from '../containers/FlashcardOverview/FlashcardOverview';
import DelayedElement from '../containers/DelayedElement';
import Button from '../componments/Button';
import PillGhostButton from '../componments/PillGhostButton';
import SearchBar from '../componments/SearchBar/SearchBar';
import ReviewBarChartKey from '../containers/ReviewBarChartKey/ReviewBarChartKey';
import MoveFolderDialogue from '../containers/Modal/MoveFolderDialogue/MoveFolderDialogue';
import CreateFlashcardSetDialogue from '../containers/Modal/CreateFlashcardSetDialogue/CreateFlashcardSetDialogue';
import DeleteFlashcardConfirmation from '../containers/Modal/DeleteFlashcardConfirmation';
import CreateFolderDialogue from '../containers/Modal/CreateFolderDialogue';
import RenameFlashcardSetPopup from '../containers/Modal/RenameFlashcardSetPopup';
import RenameFolderPopup from '../containers/Modal/RenameFolderPopup';
import ImportFromAnkiDialogue from '../containers/Modal/ImportFromAnkiDialogue';
import DeleteFolderConfirmation from '../containers/Modal/DeleteFolderConfirmation';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import Heading4 from '../componments/Text/Heading4';
import Paragraph from '../componments/Text/Paragraph';
import apiManager from '../api/Api';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './Flashcards.css';
import { getCookie } from '../api/Authentication';
import ImportCsvPopup from '../containers/Modal/ImportFromCSVDialogue/ImportFromCSVDialogue';
import GhostButton from '../componments/GhostButton';
import flashcardIcon from '../static/flashcard-set-icon.svg';
import folderIcon from '../static/folder-icon.svg';
import ankiIcon from '../static/anki.svg';
import quizletIcon from '../static/quizlet.svg';
import importIcon from '../static/import-icon.svg';
import Header from '../componments/Text/Header/Header';
import Subheader from '../componments/Text/Subheader/Subheader';
import Heading3 from '../componments/Text/Heading3/Heading3';
import Heading5 from '../componments/Text/Heading5/Heading5';
import Text from '../componments/Text/Text/Text';
import { ankiImportsDisabled, quizletImportsDisabled } from '../config';
import ImportFromCSVDialogue from '../containers/Modal/ImportFromCSVDialogue/ImportFromCSVDialogue';
import PromptBar from '../componments/PromptBar/PromptBar';
import BoldParagraph from '../componments/Text/BoldParagraph/BoldParagraph';

function AIFlashcards() {
  // Set general variables
  
  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] =
    useState(view === 'mobile' ? '8px' : '16px');

  
  return (
    <div style={{ top: '0px' }}>
      <Helmet>
        <title>{"aiflashcards"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet> 

      

      <GridContainer
        layout={view !== 'mobile' ? '240px auto' : 'auto'}
        classType="two-column-grid"
      >
        {view !== 'mobile' ? <SidePanel selectedItem="flashcards" /> : <></>}
          <GridItem
          style={{
            paddingLeft:
              view === 'mobile' ? '0px' : flashcardBoxHorizontalPadding,
            paddingRight:
              view === 'mobile' ? '0px' : flashcardBoxHorizontalPadding,
            paddingTop: '0px',
            paddingBottom: view === 'mobile' ? '0px' : '',
            width: view === 'mobile' ? '100vw' : '',
            display: view === 'mobile' ? 'block' : 'flex',
            flexDirection: 'column',
            margin:'16px',
          }}
        >
          
         <WhiteOverlay
            style={{
              height: '100%',
              paddingBottom: view === 'mobile' ? '80px' : '',
              width: view === 'desktop' ? '100%' : 'calc(100% - 16px)',
              marginBottom:'0px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            
          >
          <div style={{width:'100%', display:'flex', flexDirection: 'row', alignItems: view === 'mobile' ? 'flex-start' : 'center', margin:'16px', marginBottom:'8px'}}>
            <PromptBar width={"90%"}
            borderRadius="8px 0 0 8px"
            
            />
              <Button
              text="Submit"
              onClick={() => {searchForFlashcard()}}
              style={{
                margin: "0px",
                width: "114px",
                borderRadius: "0px 8px 8px 0px",
                height: "42px",
                marginTop: view === "mobile" ? "8px" : "0px",
              }}
            />
            </div>

             <div style={{width:'100%', display:'flex', flexDirection: 'row', alignItems: view === 'mobile' ? 'flex-start' : 'center', margin:'16px' , height:'100px'}}>
            <PromptBar width={"90%"}
            height={'100%'}
            borderRadius="8px 0 0 8px"
            
            />
              <Button
              text="Submit"
              onClick={() => {searchForFlashcard()}}
              style={{
                margin: "0px",
                width: "114px",
                borderRadius: "0px 8px 8px 0px",
                height: "122px",
                marginTop: view === "mobile" ? "8px" : "0px",
              }}
            />
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
               <GridContainer
                  layout={view !== 'mobile' ? '5fr 5fr 1fr' : 'auto'}
                  classType="ai-flashcards-grid"
              >
                 <GridItem
                  style={{
                    paddingTop: '0px',
                    paddingBottom: view === 'mobile' ? '0px' : '',
                    width: '100%',
                    display: view === 'mobile' ? 'block' : 'flex',
                    flexDirection: 'column',
                  }}
              >
                <BoldParagraph text={"Term:"} />
              </GridItem>

                <GridItem
                style={{
                  paddingTop: '0px',
                  paddingBottom: view === 'mobile' ? '0px' : '',
                  width: '100%',
                  display: view === 'mobile' ? 'block' : 'flex',
                  flexDirection: 'column',
                }}
              >
                <BoldParagraph text={"Definition:"} />
              </GridItem>
              <GridItem
                  style={{
                    paddingTop: '0px',
                    paddingBottom: view === 'mobile' ? '0px' : '',
                    width: '10%',
                    display: view === 'mobile' ? 'block' : 'flex',
                    flexDirection: 'column',
                  }}
              >
              </GridItem>
              </GridContainer>
            <Paragraph
              text="More flashcards are being added every day, so if you can't find what you're looking for, please check back later!"
              style={{textAlign: "center", marginTop: "16px", color: "var(--grey-header-light)"}}
            />
            </div>
          </WhiteOverlay>
          </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default AIFlashcards;
