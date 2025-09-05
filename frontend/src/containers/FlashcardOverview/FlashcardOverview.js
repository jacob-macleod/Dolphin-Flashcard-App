import React, { useEffect } from 'react';
import FlashcardFolder from './FlashcardFolder/FlashcardFolder';
import FlashcardItem from './FlashcardItem/FlashcardItem';
import Heading5 from '../../componments/Text/Heading5/Heading5';
function FlashcardOverview({
  flashcardData,
  setMoveFolderDialogueVisible,
  showDeleteFlashcardConfirmation,
  setRenameFlashcardSetPopupVisible,
  setDeleteFolderConfirmationVisible,
  setRenameFolderPopupVisible,
  view,
  selected,
  setSelected
}) {

  function filterFlashcardSet(cardData, title) {
    /*
    Remove everything from flashcard data except the flashcard with the title
    */
    // Helper function for deep search
    function search(obj) {
      if (typeof obj !== 'object' || obj === null) return null;
  
      // Check if the current object has the target title
      if (obj.flashcardName === title) {
        return obj;
      }
  
      // Recurse into each property
      for (const key in obj) {
        const result = search(obj[key]);
        if (result) return result;
      }
  
      return null;
    }
  
    return search(cardData);
  }

  useEffect(() => {
    console.log("flashcardData")
    console.log(flashcardData)
  }, [flashcardData])

  const renderElement = (element, folderName, path="") => {
    if (element.cards) {
      return (
        <div key={element.flashcardID}>
          <FlashcardItem
            element={element}
            setMoveFolderDialogueVisible={setMoveFolderDialogueVisible}
            showDeleteConfirmation={showDeleteFlashcardConfirmation}
            setRenameFlashcardSetPopupVisible={setRenameFlashcardSetPopupVisible}
            flashcardData={filterFlashcardSet(flashcardData, element.flashcardName)}
            path={path}
            view={view}
            selected={selected}
            setSelected={setSelected}
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
          showDeleteConfirmation={setDeleteFolderConfirmationVisible}
          setRenameFolderPopupVisible={setRenameFolderPopupVisible}
          flashcardData={element}
          child={Object.entries(element).map(([key, value]) => renderElement(value, key, path))}
          view={view}
          path={path}
        />
      );
    }
  };
  // If flashcardData has no data, return a message to the user
  // If flashcardData has data, it is == ["User has no flashcards"]
  return Array.isArray(flashcardData)
  ? <Heading5 text="You don't have any flashcards yet!"/>
  : <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>;
}

export default FlashcardOverview;
