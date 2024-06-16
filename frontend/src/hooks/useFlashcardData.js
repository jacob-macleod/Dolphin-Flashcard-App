import { useState, useEffect } from 'react';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';

const useFlashcardData = (newSet, folder, flashcardID, description, flashcardName) => {
    const [flashcardData, setFlashcardData] = useState(null);
    const [flashcardsExist, setFlashcardsExist] = useState(null);
    const [flashcardItems, setFlashcardItems] = useState([]);

    console.log("Loading")

    useEffect(() => {
        console.log("using useeffect")
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
        console.log("Using second useeffect")
        const fetchCardData = async () => {
        const cardPromises = flashcardData.cards.map((cardID) => {
            return new Promise((resolve) => {
                console.log("Getting card data")
                apiManager.getFlashcardItem(cardID, (item) => {
                    resolve(item);
                });
            });
        });

        const cardData = await Promise.all(cardPromises);
        setFlashcardItems(cardData);
        setFlashcardsExist(true);
        };
        console.log("Approaching if statement")
        console.log(flashcardData);
        if (flashcardData && flashcardData.cards.length) {
            console.log("Fetching card data");
            fetchCardData();
        } else if (flashcardData && flashcardData.cards.length === 0) {
            console.log("No flashcards exist");
            setFlashcardsExist(false);
        }
    }, [flashcardData]);

    return { flashcardData, flashcardsExist, flashcardItems, setFlashcardItems };
};

export default useFlashcardData;
