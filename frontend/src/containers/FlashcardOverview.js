import React from 'react';
import FlashcardFolder from '../componments/FlashcardFolder';
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
        /*<div key={folderName + element.flashcardID}>
          <p>{folderName}</p>
          {Object.entries(element).map(([key, value]) => renderElement(value, key))}
        </div>*/
        <FlashcardFolder
          element={element}
          name={folderName}
          folderKey={folderName + element.flashcardID}
          child={Object.entries(element).map(([key, value]) => renderElement(value, key))}
        />
      );
    }
  };

  return <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>;
}

export default FlashcardOverview;
