import React from 'react';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import getCommunityFlashcard from '../../hooks/getCommunityFlashcard.js';

function PreviewTotalFlashcardBrowser({ flashcardID }) {
    // Use the hook and pass flashcardID as a parameter
    const { flashcardData, flashcardsExist, flashcardItems, individualCards, setFlashcardItems} = getCommunityFlashcard(flashcardID);

    return (
        <RenderTotalFlashcardBrowser
            flashcardItems={flashcardItems}
            individualCards={individualCards}
        />
    );
}

export default PreviewTotalFlashcardBrowser;
