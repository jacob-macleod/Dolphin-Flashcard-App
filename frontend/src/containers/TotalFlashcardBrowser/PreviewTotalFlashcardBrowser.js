import React from 'react';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import getCommunityFlashcard from '../../hooks/getCommunityFlashcard.js';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';

function PreviewTotalFlashcardBrowser({ flashcardID, setFlashcardOwner, flashcardOwner }) {
    // Use the hook and pass flashcardID as a parameter
    const { flashcardData, flashcardsExist, flashcardItems, individualCards, setFlashcardItems} = getCommunityFlashcard(flashcardID);

    // Set the owner of the flashcard
    if (flashcardOwner === "" && flashcardItems !== undefined && flashcardItems[0] !== undefined) {
        apiManager.getUser(
            flashcardItems[0].owner,
            setFlashcardOwner
        );
    };

    console.log(flashcardData);
    console.log(flashcardItems);
    console.log(individualCards);

    return (
        <RenderTotalFlashcardBrowser
            flashcardItems={flashcardItems}
            individualCards={individualCards}
        />
    );
}

export default PreviewTotalFlashcardBrowser;
