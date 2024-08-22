import { useState, useEffect } from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

const getFlashcardDataForMultipleCards = (folders, flashcardIDs, flashcardNames) => {
  const [flashcardData, setFlashcardData] = useState([]);
  const [flashcardsExist, setFlashcardsExist] = useState(null);
  const [flashcardItems, setFlashcardItems] = useState([]);
  const [individualCards, setIndividualCards] = useState([]);

  useEffect(() => {
    const fetchFlashcardData = async () => {
      const flashcardDataArray = [];

      for (let i = 0; i < flashcardIDs.length; i++) {
        const flashcardID = flashcardIDs[i];
        const folder = folders[i];
        const flashcardName = flashcardNames[i];

        const temporaryFlashcardData = await new Promise((resolve) => {
          apiManager.getFlashcard(getCookie("userID"), flashcardID, resolve);
        });

        flashcardDataArray.push({ ...temporaryFlashcardData, folder, flashcardName });
      }

      setFlashcardData(flashcardDataArray);

      const allCardData = [];
      for (let data of flashcardDataArray) {
        if (data.cards && Object.keys(data.cards).length > 0) {
          const cardPromises = Object.keys(data.cards).map((cardID) => {
            console.log(cardID);
            return new Promise((resolve) => {
              apiManager.getFlashcardItem(cardID, (item) => {
                resolve(item);
              });
            });
          });

          const cardData = await Promise.all(cardPromises);
          allCardData.push({ ...data, cards: cardData });
        }
      }

      setFlashcardItems(allCardData);
      setFlashcardsExist(allCardData.length > 0);
    };

    if (Array.isArray(flashcardIDs) && flashcardIDs.length > 0) {
      fetchFlashcardData();
    } else {
      setFlashcardsExist(false);
    }
  }, [folders, flashcardIDs, flashcardNames]);

  useEffect(() => {
    const extractedCards = flashcardItems.flatMap((item) => 
      item.cards.map((card) => ({
        front: card.front,
        back: card.back,
      }))
    );
    setIndividualCards(extractedCards);
  }, [flashcardItems]);

  return { flashcardData, flashcardsExist, flashcardItems, individualCards, setFlashcardItems };
};

export default getFlashcardDataForMultipleCards;
