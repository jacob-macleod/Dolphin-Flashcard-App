import React from 'react';
import FlashcardFolder from '../FlashcardOverview/FlashcardFolder/FlashcardFolder';
import FolderElement from '../FlashcardOverview/FolderElement/FolderElement';
import '../Modal/MoveFolderDialogue/MoveFolderDialogue.css';
import '../Modal/Modal.css';

function FolderTreeView({ visible }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const flashcardData = visible.flashcardData;

    const renderElement = (element, folderName, path="") => {
        if (path !== "") {
            path = path + "/" + folderName;
        } else {
            path = folderName;
        }

        if (element.cards) {
        } else {
          return (
            <FlashcardFolder
              element={element}
              name={folderName}
              path={path}
              folderKey={folderName + element.flashcardID}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              child={Object.entries(element).map(([key, value]) => renderElement(value, key, path))}
            />
          );
        }
    };

    if (visible[0] !== "User has no flashcards") {
        return Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))
    } else {
        return (
            <FolderElement
            element={<div></div>}
            name={"Your Account"}
            path={""}
            folderKey={""}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            child={null}
            />
        );
    }
}

export default FolderTreeView;