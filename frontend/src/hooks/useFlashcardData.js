import { useState, useEffect } from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

const useFlashcardData = (newSet, folder, flashcardID, description, flashcardName) => {
    const [flashcardData, setFlashcardData] = useState(null);
    const [flashcardsExist, setFlashcardsExist] = useState(null);
    const [flashcardItems, setFlashcardItems] = useState([]);

    useEffect(() => {
        if (newSet === "true") {
        setFlashcardData({
            "cards": [],
            "description": description,
            "name": flashcardName,
        });
        setFlashcardsExist(false);
        } else {
        apiManager.getFlashcard(
            flashcardID,
            setFlashcardData
        );
        }
    }, [newSet, folder, flashcardName, description]);

    useEffect(() => {
        const fetchCardData = async () => {
        const cardPromises = flashcardData.cards.map((cardID) => {
            return new Promise((resolve) => {
                apiManager.getFlashcardItem(cardID, (item) => {
                    resolve(item);
                });
            });
        });

        const cardData = await Promise.all(cardPromises);
        setFlashcardItems(cardData);
        setFlashcardsExist(true);
        };
        console.log(flashcardData);
        if (flashcardData && flashcardData.cards.length) {
            fetchCardData();
        } else if (flashcardData && flashcardData.cards.length === 0) {
            setFlashcardsExist(false);
        }
    }, [flashcardData]);

    return { flashcardData, flashcardsExist, flashcardItems, setFlashcardItems };
};

export default useFlashcardData;
