import { React, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { getTodayCardsFromStorage } from '../../hooks/useTodayCards';
import useCardData from '../../hooks/useCardData';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';
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
  const [newDataSaved, setNewDataSaved] = useState(false);
  const location = useLocation();
  const { folder, flashcardName, flashcardID } = queryString.parse(location.search, { arrayFormat: 'bracket' });
  const [cardsSaved, setCardsSaved] = useState(false);

  function nextFibonacci(num) {
    // Edge cases for very small numbers
    if (num < 0) return 0;
    if (num === 0) return 1;
  
    let a = 0;
    let b = 1;
    let nextFib = a + b;
  
    // Generate Fibonacci numbers until we find one greater than num
    while (nextFib <= num) {
      a = b;
      b = nextFib;
      nextFib = a + b;
    }
  
    return nextFib;
  }

  function saveFlashcards() {
    /*
    Save the flashcard data
    */
   alert ("Running save functuion")
   apiManager.updateCardProgress(
    getCookie("userID"),
    updatedCardData,
    setCardsSaved
   )
  }

  function isDateBeforeToday(dateString) {
    // Parse the given date string into a Date object
    const givenDate = new Date(dateString.split('/').reverse().join('/'));
  
    // Get the current date
    const today = new Date();
  
    // Set the time of the current date to midnight to compare only the date part
    today.setHours(0, 0, 0, 0);
  
    // Compare the dates
    return givenDate < today;
  }

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
              last_review: reviewStatuses[card.cardID]
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
            last_review: new Date().toLocaleDateString('en-GB')
          };
        }
        return card;
      });
    } else if (response === "This is easy") {
      const reviewStatus = updatedCardData[cardIndex].review_status.split(".");
      let daily = parseFloat(reviewStatus[0]);
      let subDaily = parseFloat(reviewStatus[1]);
      
      subDaily = 0;
      daily = nextFibonacci(daily);

      newCardData = updatedCardData.map(card => {
        if (card.cardID === updatedCardData[cardIndex].cardID) {
          return {
            ...card,
            review_status: `${daily}.${subDaily}`,
            last_review: new Date().toLocaleDateString('en-GB')
          };
        }
        return card;
      });
    }
  

    setUpdatedCardData(newCardData);
    if (cardIndex < updatedCardData.length - 1) {
      // TODO: Only show cards with a review status of 0.x
      // or that were last revised before yesterday
      let cardIndexValid = false;
      let newIndex = cardIndex + 1;
      let cardsRevised = 0;
      while (cardIndexValid == false) {
        let reviewStatus = updatedCardData[newIndex].review_status
        let lastReview = updatedCardData[newIndex].last_review
        let daily = parseFloat(reviewStatus[0]);

        if (daily == 0 || isDateBeforeToday(lastReview)) {
          cardIndexValid = true;
        } else {
          newIndex += 1;
          cardsRevised += 1;
        }

        // Switch to the first card if the last is reached
        if (newIndex >= updatedCardData.length) {
          newIndex = 0;
        }

        // If no card is valid
        if (cardsRevised >= updatedCardData.length) {
          saveFlashcards();
          alert ("No cards left - saving changes");
          setUpdatedCardData([]);
          newIndex = -1;
          cardIndexValid = true;
        }
      }

      if (newIndex != -1) {
        setCardIndex(newIndex);
      }
      
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
