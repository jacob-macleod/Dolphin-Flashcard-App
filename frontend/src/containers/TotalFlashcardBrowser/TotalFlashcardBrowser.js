import React, { useState, useEffect } from 'react';
import DelayedElement from '../DelayedElement/DelayedElement.js';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import "./TotalFlashcardBrowser.css";
import Heading5 from '../../componments/Text/Heading5/Heading5.js';

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

  const [time, setTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const {
    flashcardData,
    flashcardsExist,
    flashcardItems,
    individualCards,
    setFlashcardItems,
    flashcardsLoaded
  } = useFlashcardDataForMultipleCards(folder, flashcardID, "", flashcardName);
  const [loadingIcon, setLoadingIcon] = useState(true);
  

  useEffect(() => {
    if (flashcardsLoaded === false) {
        // Hide the loading icon
        setLoadingIcon(null);
    } else {
        // Show the loading icon
        setLoadingIcon(true);
    }
  }), [flashcardsLoaded];

  return (
    <div>
    {(flashcardItems.length == 0 && time == true) ? (
       <Heading5 text="No Flashcards!"/>
  ) :  <div>{ (
  
  <DelayedElement childValue={loadingIcon} child={
      <RenderTotalFlashcardBrowser
          flashcardData={flashcardData}
          flashcardsExist={flashcardsExist}
          flashcardItems={flashcardItems}
          individualCards={individualCards}
          setFlashcardItems={setFlashcardItems}
      />
    }/>
    )}</div>}
    </div>
  );
}

export default TotalFlashcardBrowser;
