import { useState, useEffect } from 'react';
import apiManager from '../api/Api';

const useCardData = (cardIDs) => {
  const [cardData, setCardData] = useState([]);
  const [cardsLoaded, setCardsLoaded] = useState(null);
  const [cardsExist, setCardsExist] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      const cardPromises = cardIDs.map((cardID) => {
        return new Promise((resolve) => {
          apiManager.getFlashcardItem(cardID, (item) => {
            resolve({...item, cardID: cardID});
          });
        });
      });

      const cardData = await Promise.all(cardPromises);
      setCardData(cardData);
      setCardsExist(true);
      setCardsLoaded(true);
    };

    if (cardIDs.length === 0) {
      // Cards are loaded, but there aren't any cards avaliable to learn
      setCardsLoaded(true);
    }

    if (cardIDs && cardIDs.length > 0) {
      fetchCardData();
    } else {
      setCardsExist(false);
    }
  }, []);


  return { cardData, cardsExist, cardsLoaded };
};

export default useCardData;