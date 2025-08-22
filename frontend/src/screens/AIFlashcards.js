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
      {/* <Helmet>
        <title>{"hello"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet> */}

      

      <GridContainer
        layout={view !== 'mobile' ? '240px auto' : 'auto'}
        classType="two-column-grid"
      >
        {view !== 'mobile' ? <SidePanel selectedItem="flashcards" /> : <></>}


      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default AIFlashcards;
