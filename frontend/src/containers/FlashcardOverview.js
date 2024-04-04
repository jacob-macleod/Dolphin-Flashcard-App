import React from 'react';
import FlashcardFolder from '../componments/FlashcardFolder';
import FlashcardItem from '../componments/FlashcardItem';

function FlashcardOverview({ flashcardData, setMoveFolderDialogueVisible }) {
  const renderElement = (element, folderName, path="") => {
    if (element.cards) {
      return (
        <div key={element.flashcardID}>
          <FlashcardItem element={element} setMoveFolderDialogueVisible={setMoveFolderDialogueVisible} flashcardData={flashcardData} path={path}/>
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
        />
      );
    }
  };

  return <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>;
}

export default FlashcardOverview;
