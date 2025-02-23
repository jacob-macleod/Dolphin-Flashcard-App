import React, { useState, useEffect } from 'react';
import DelayedElement from '../DelayedElement/DelayedElement.js';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import "./TotalFlashcardBrowser.css";

const slideVariants = {
  hiddenLeft: { x: '-100%', opacity: 0, position: 'fixed' },
  hiddenRight: { x: '100%', opacity: 0, position: 'fixed' },
  visible: { x: 0, opacity: 1, position: 'relative' },
  exitLeft: { x: '-20%', width: "0px", opacity: 0, position: 'fixed' },
  exitRight: { x: '100%', opacity: 0, position: 'fixed' },
};

function TotalFlashcardBrowser({ folder, flashcardName, flashcardID}) {
  /* An interface to access RenderTotalFlashcardBrowser. Used when viewing flashcards which
  have been added to a folder. */

  const {
    flashcardData,
    flashcardsExist,
    flashcardItems,
    individualCards,
    setFlashcardItems,
  } = useFlashcardDataForMultipleCards(folder, flashcardID, "", flashcardName);
  const [loadingIcon, setLoadingIcon] = useState(null);

  useEffect(() => {
      if (flashcardItems.length !== 0) {
          // Show the loading icon
          setLoadingIcon(true);
      } else {
          // Hide the loading icon
          setLoadingIcon(null);
      }
  }), [flashcardItems];

  return (
    <DelayedElement childValue={loadingIcon} child={
      <RenderTotalFlashcardBrowser
          flashcardData={flashcardData}
          flashcardsExist={flashcardsExist}
          flashcardItems={flashcardItems}
          individualCards={individualCards}
          setFlashcardItems={setFlashcardItems}
      />
    }/>
  );
}

export default TotalFlashcardBrowser;
