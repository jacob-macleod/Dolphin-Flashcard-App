import { React, useEffect, useState } from 'react';
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
  const [cardIndex, setCardIndex] = useState(0);
  const [updatedCardData, setUpdatedCardData] = useState([]);
  const [addedReviewDataToCards, setAddedReviewDataToCards] = useState(false);

  const location = useLocation();
  const { folder, flashcardName, flashcardID } = queryString.parse(location.search, { arrayFormat: 'bracket' });
  const collectCardIDs = (cards, flashcardIDs) => {
    const cardIDs = [];
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

  useEffect(() => {
    /*
    This code should only populate card data once, otherwise it'll
    rerun and reset the card data every time a user revises a card
    */
    if (addedReviewDataToCards === false) {
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

        setUpdatedCardData(prevCardData => {
          if (JSON.stringify(newCardData) !== JSON.stringify(prevCardData)) {
            return newCardData;
          }
          return prevCardData;
        });
      }
      // Again, make sure it only populates card data once
      if (cardData.length !== 0) {
        setAddedReviewDataToCards(true);
      }
    }
  }, [cardData, reviewStatuses]);

  const setResponse = (response) => {
    let newCardData = updatedCardData;
    if (response === "I'm not sure" && updatedCardData.length > 0) {
      newCardData = updatedCardData.map(card => {
        if (card.cardID === updatedCardData[cardIndex].cardID) {
          return { ...card, review_status: "0.0" };
        }
        return card;
      });
    } else if (response === "I know") {
      const reviewStatus = updatedCardData[cardIndex].review_status.split(".");
      let daily = parseFloat(reviewStatus[0]);
      let subDaily = parseFloat(reviewStatus[1]);
      
      subDaily += 3;
      if (subDaily > 10) {
        subDaily = 0;
        daily += 1;
      }

      newCardData = updatedCardData.map(card => {
        if (card.cardID === updatedCardData[cardIndex].cardID) {
          return {
            ...card,
            review_status: `${daily}.${subDaily}`,
            last_review: new Date().toISOString().slice(0, 10)
          };
        }
        return card;
      });
    }
  

    setUpdatedCardData(newCardData);
    if (cardIndex < updatedCardData.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  useEffect(() => {
    console.log(updatedCardData);
  }, [updatedCardData]);

  return (
    <>
      {
        updatedCardData.length !== 0 ?
          <CardOverview
            text={updatedCardData[cardIndex].front}
            description={updatedCardData[cardIndex].back}
            showResponseOptions={true}
            setResponse={setResponse}
            height="264px"
          />
          : null
      }
    </>
  );
}

export default TotalFlashcardBrowser;
