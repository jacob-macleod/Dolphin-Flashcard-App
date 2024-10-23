import { useState, useEffect } from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

const getCommunityFlashcard = (flashcardID) => {
    const [flashcardData, setFlashcardData] = useState(null);
    const [flashcardsExist, setFlashcardsExist] = useState(null);
    const [flashcardItems, setFlashcardItems] = useState([]);
    const [individualCards, setIndividualCards] = useState([]);

    useEffect(() => {
        const fetchFlashcardData = async () => {

            const temporaryFlashcardData = await new Promise((resolve) => {
                apiManager.getPublicFlashcard(flashcardID, resolve);
            });

            setFlashcardData({ ...temporaryFlashcardData });
        };
    
        if (flashcardID !== "") {
            fetchFlashcardData();
        } else {
            setFlashcardsExist(false);
        }
    }, [flashcardID]);


    useEffect(() => {
        console.log(flashcardData);
        const fetchIndividualFlashcards = async () => {
            const allCardData = [];
            if (flashcardData.cards !== undefined) {
                const cardPromises = Object.keys(flashcardData.cards).map((cardIndex) => {
                    const cardID = flashcardData.cards[cardIndex];
                    return new Promise((resolve) => {
                    apiManager.getFlashcardItem(cardID, (item) => {
                        resolve(item);
                    });
                    });
                });

                const cardData = await Promise.all(cardPromises);
                allCardData.push({ ...flashcardData, cards: cardData });
            }
            console.log(allCardData);
            setFlashcardItems(allCardData);
            setFlashcardsExist(allCardData.length > 0);
        };

        if (flashcardData === null) {
            return;
        } else {
            fetchIndividualFlashcards();
        }
    }, [flashcardData]);

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

export default getCommunityFlashcard;
