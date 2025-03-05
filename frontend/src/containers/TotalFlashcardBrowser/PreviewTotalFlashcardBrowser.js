import {React, useEffect, useState} from 'react';
import DelayedElement from '../DelayedElement/DelayedElement.js';
import RenderTotalFlashcardBrowser from './RenderTotalFlashcardBrowser';
import getCommunityFlashcard from '../../hooks/getCommunityFlashcard.js';
import apiManager from '../../api/Api';

function PreviewTotalFlashcardBrowser({ flashcardID, setFlashcardOwner, flashcardOwner }) {
    // Use the hook and pass flashcardID as a parameter
    const { flashcardData, flashcardsExist, flashcardItems, individualCards, setFlashcardItems} = getCommunityFlashcard(flashcardID);
    const [loadingIcon, setLoadingIcon] = useState(null);

    useEffect(() => {
        if (flashcardItems.length !== 0) {
            // Show the loading icon
            setLoadingIcon(true);
        } else {
            // Hide the loading icon
            setLoadingIcon(null);
        }
    }), [flashcardItems];

    // Set the owner of the flashcard
    if (flashcardOwner === "" && flashcardItems !== undefined && flashcardItems[0] !== undefined) {
        apiManager.getUser(
            flashcardItems[0].owner,
            setFlashcardOwner
        );
    };

    return (
        <DelayedElement childValue={loadingIcon} child={
            <RenderTotalFlashcardBrowser
                flashcardItems={flashcardItems}
                individualCards={individualCards}
            />
        }/>
    );
}

export default PreviewTotalFlashcardBrowser;
