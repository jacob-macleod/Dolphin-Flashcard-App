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
      // Stores review_status and last_review in format {cardID: {"reviewStatus": "", "lastReview": ""}}
      const reviewStatuses = {};
    
      const traverse = (obj) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
    
            if (value && typeof value === 'object') {
              if (flashcardIDs.includes(value.flashcardID)) {
                if (value.cards) {
                  for (const cardID in value.cards) {
                    if (value.cards.hasOwnProperty(cardID)) {
                      const card = value.cards[cardID];
                      cardIDs.push(cardID);
                      reviewStatuses[cardID] = {
                        reviewStatus: card.review_status,
                        lastReview: card.last_review
                      };
                    }
                  }
                }
              }
              traverse(value);
            }
          }
        }
      };
    
      traverse(cards);
      return { cardIDs, reviewStatuses };
    };
    
    const { cardIDs, reviewStatuses } = collectCardIDs(todayCards, flashcardID);
    const { cardData, cardsExist } = useCardData(cardIDs);
    const [updatedCardData, setUpdatedCardData] = useState([]);
  
    useEffect(() => {
      if (cardData.length > 0) {
        const newCardData = cardData.map(card => {
          if (reviewStatuses[card.cardID]) {
            return {
              ...card,
              review_status: reviewStatuses[card.cardID].reviewStatus,
              last_review: reviewStatuses[card.cardID].lastReview
            };
          }
          return card;
        });
  
        // Only update state if the new data is different from the current state
        if (JSON.stringify(newCardData) !== JSON.stringify(updatedCardData)) {
          setUpdatedCardData(newCardData);
        }
      }
    }, [cardData, reviewStatuses]);
  

  return (
    <>
      {
      updatedCardData.length != 0?
        <CardOverview
        text={updatedCardData[0].front}
        description={updatedCardData[0].back}
        showResponseOptions={true}
        height="264px"
        />
        : null
      }
    </>
  );
}

export default TotalFlashcardBrowser;
