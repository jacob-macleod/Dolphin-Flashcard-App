import { useState, useEffect } from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

const getFlashcardDataForMultipleCards = (folders, flashcardIDs, flashcardNames) => {
  const [flashcardData, setFlashcardData] = useState([]);
  const [flashcardsExist, setFlashcardsExist] = useState(null);
  const [flashcardItems, setFlashcardItems] = useState([]);
  const [individualCards, setIndividualCards] = useState([]);
  const [flashcardsLoaded, setFlashcardsLoaded] = useState(false);

  useEffect(() => {
    const fetchFlashcardData = async () => {
      // Make sure loading starts as false whenever a new fetch begins
      setFlashcardsLoaded(false);

      const flashcardDataArray = [];

      // First: load all flashcard sets
      for (let i = 0; i < flashcardIDs.length; i++) {
        const flashcardID = flashcardIDs[i];
        const folder = folders[i];
        const flashcardName = flashcardNames[i];

        const temporaryFlashcardData = await new Promise((resolve) => {
          apiManager.getFlashcard(
            getCookie("jwtToken"),
            flashcardID,
            resolve
          );
        });

        flashcardDataArray.push({
          ...temporaryFlashcardData,
          folder,
          flashcardName
        });
      }

      setFlashcardData(flashcardDataArray);

      // Second: load all individual cards
      const allCardData = [];

      for (const data of flashcardDataArray) {
        if (data.cards && Object.keys(data.cards).length > 0) {

          const cardPromises = Object.keys(data.cards).map((cardID) => {
            return new Promise((resolve) => {
              apiManager.getFlashcardItem(cardID, (item) => {
                resolve(item);
              });
            });
          });

          const cardData = await Promise.all(cardPromises);

          allCardData.push({
            ...data,
            cards: cardData
          });
        }
      }

      // Everything has now finished loading
      setFlashcardItems(allCardData);
      setFlashcardsExist(allCardData.length > 0);

      // Extract individual cards now that we know everything is loaded
      const extractedCards = allCardData.flatMap((item) =>
        item.cards.map((card) => ({
          front: card.front,
          back: card.back,
        }))
      );

      setIndividualCards(extractedCards);

      // THIS IS THE VERY LAST THING
      setFlashcardsLoaded(true);
    };

    if (Array.isArray(flashcardIDs) && flashcardIDs.length > 0) {
      fetchFlashcardData();
    } else {
      setFlashcardsExist(false);
      setIndividualCards([]);
      setFlashcardItems([]);
      setFlashcardsLoaded(true);
    }

  }, [folders, flashcardIDs, flashcardNames]);

  return {
    flashcardData,
    flashcardsExist,
    flashcardItems,
    individualCards,
    setFlashcardItems,
    flashcardsLoaded
  };
};

export default getFlashcardDataForMultipleCards;