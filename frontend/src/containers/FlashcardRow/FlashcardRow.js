import React from 'react';
import CardOverview from '../CardOverview';
import "./FlashcardRow.css"

function FlashcardRow({ front, back }) {
    return (
        <div className='flashcard-row'>
            <CardOverview text={front} />
            <CardOverview text={back} />
        </div>
    );
}

export default FlashcardRow;