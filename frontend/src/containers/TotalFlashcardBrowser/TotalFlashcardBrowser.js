import React, { useState, useEffect } from 'react';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';
import Paragraph from '../../componments/Text/Paragraph';
import "../../componments/Text/Link/Link.css";

function TotalFlashcardBrowser({ folder, flashcardName, flashcardID}) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const {
        flashcardData,
        flashcardsExist,
        flashcardItems,
        individualCards,
        setFlashcardItems,
      } = useFlashcardDataForMultipleCards(folder, flashcardID, "", flashcardName);

  return (
    <>{
        flashcardItems != undefined && flashcardItems.length !== 0
        ? <>
            {flashcardItems[currentCardIndex].front != undefined
            ? <CardOverview text={flashcardItems[currentCardIndex].front} showTurnOverButton={true} />
            : <></>}
            <Paragraph text={"1/" + individualCards.length} type="grey" />
        </>
        : <></>
    }</>
  );
}

export default TotalFlashcardBrowser;
