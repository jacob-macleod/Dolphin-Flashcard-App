import {React, useEffect, useState} from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { getTodayCardsFromStorage } from '../../hooks/useTodayCards';
import useCardData from '../../hooks/useCardData';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';

const slideVariants = {
  hiddenLeft: { x: '-100%', opacity: 0, position: 'fixed' },
  hiddenRight: { x: '100%', opacity: 0, position: 'fixed' },
  visible: { x: 0, opacity: 1, position: 'relative' },
  exitLeft: { x: '-20%', width: "0px", opacity: 0, position: 'fixed' },
  exitRight: { x: '100%', opacity: 0, position: 'fixed' },
};

function TotalFlashcardBrowser() {
    const [todayCards, setTodayCards] = useState(getTodayCardsFromStorage());

    // Extract query parameters
    const location = useLocation();

    const { folder, flashcardName, flashcardID } = queryString.parse(location.search, { arrayFormat: 'bracket' });

    const collectCardIDs = (cards, flashcardIDs) => {
      const cardIDs = [];
  
      const traverse = (obj) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
  
            if (value && typeof value === 'object') {
              if (flashcardIDs.includes(value.flashcardID)) {
                if (value.cards) {
                  cardIDs.push(...Object.keys(value.cards));
                }
              }
              traverse(value);
            }
          }
        }
      };
  
      traverse(cards);
      return cardIDs;
    };
  
    const cardIDs = collectCardIDs(todayCards, flashcardID);
    console.log(cardIDs);
    const {cardData, cardsExist} = useCardData(cardIDs);

    useEffect(() => {
      console.log(cardData);
    }, cardData);

  return (
    <>
        <CardOverview
        text={"Set"}
        description={"Description"}
        showResponseOptions={true}
        height="264px"
        />
    </>
  );
}

export default TotalFlashcardBrowser;
