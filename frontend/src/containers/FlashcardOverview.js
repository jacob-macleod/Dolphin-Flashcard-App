import React from 'react';
import FlashcardItem from '../componments/FlashcardItem';

function FlashcardOverview({ flashcardData }) {
  const renderElement = (element, folderName) => {
    if (element.cards) {
      return (
        <div key={element.flashcardID}>
          <FlashcardItem element={element} />
        </div>
      );
    } else {
      return (
        <div key={folderName + element.flashcardID}>
          <p>{folderName}</p>
          {Object.entries(element).map(([key, value]) => renderElement(value, key))}
        </div>
      );
    }
  };

  return <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>;
}

export default FlashcardOverview;
