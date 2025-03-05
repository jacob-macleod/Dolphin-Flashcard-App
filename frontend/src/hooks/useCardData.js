import { useState, useEffect } from 'react';
import apiManager from '../api/Api';

const useCardData = (cardIDs) => {
  const [cardData, setCardData] = useState([]);
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
    };

    if (cardIDs && cardIDs.length > 0) {
      fetchCardData();
    } else {
      setCardsExist(false);
    }
  }, []);

  return { cardData, cardsExist };
};

export default useCardData;