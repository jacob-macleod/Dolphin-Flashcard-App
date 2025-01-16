import React, { useState, useEffect, useCallback } from 'react';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';
import Paragraph from '../../componments/Text/Paragraph';
import Image from '../../componments/Image/Image';
import GreyRightArrow from '../../static/grey-right-arrow.svg';
import GreyLeftArrow from '../../static/grey-left-arrow.svg';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import "./TotalFlashcardBrowser.css";
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <RenderTotalFlashcardBrowser
        flashcardData={flashcardData}
        flashcardsExist={flashcardsExist}
        flashcardItems={flashcardItems}
        individualCards={individualCards}
        setFlashcardItems={setFlashcardItems}
    />
  );
}

export default TotalFlashcardBrowser;
