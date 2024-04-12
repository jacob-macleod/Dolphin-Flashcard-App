import React from 'react';
import FlashcardFolder from './FlashcardFolder/FlashcardFolder';
import FlashcardItem from './FlashcardItem/FlashcardItem';
import Heading5 from '../../componments/Text/Heading5/Heading5';

function FlashcardOverview({ flashcardData, setMoveFolderDialogueVisible, view }) {
  const renderElement = (element, folderName, path="") => {
    if (element.cards) {
      return (
        <div key={element.flashcardID}>
          <FlashcardItem
            element={element}
            setMoveFolderDialogueVisible={setMoveFolderDialogueVisible}
            flashcardData={flashcardData}
            path={path}
            view={view}
          />
        </div>
      );
    } else {
      if (path !== "") {
        path = path + "/" + folderName;
      } else {
          path = folderName;
      }

      return (
        <FlashcardFolder
          element={element}
          name={folderName}
          folderKey={folderName + element.flashcardID}
          child={Object.entries(element).map(([key, value]) => renderElement(value, key, path))}
          view={view}
        />
      );
    }
  };
  // If flashcardData has no data, return a message to the user
  // If flashcardData has data, it is == ["User has no flashcards"]
  console.log(flashcardData)
  console.log(Array.isArray(flashcardData));
  return Array.isArray(flashcardData)
  ? <Heading5 text="You don't have any flashcards yet!"/>
  : <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>;
}

export default FlashcardOverview;
