import React from 'react';
import FlashcardFolder from '../FlashcardOverview/FlashcardFolder/FlashcardFolder';
import FolderElement from '../FlashcardOverview/FolderElement/FolderElement';
import '../Modal/MoveFolderDialogue/MoveFolderDialogue.css';
import '../Modal/Modal.css';

function FolderTreeView({ visible, selectedPath, setSelectedPath }) {
    // If visible is not an array, add a "Your account" folder
    if (visible[0] !== "User has no flashcards") {
        visible = {"Your Account": visible}
    };
    console.log("DATA");
    console.log (selectedPath);
    console.log (visible);

    const renderElement = (element, folderName, path="") => {
        if (path !== "") {
            path = path + "/" + folderName;
        } else {
            path = folderName;
        }

        if (element.cards) {
        } else {
        // Make sure the path stays as "" for the first item, which is the root folder
        // But shown to the user as a folder called "Your Account"
        var pathName;
        if (folderName === "Your Account") {
            path = ""
            pathName = ""
        } else {
            pathName = folderName;
        }

          return (
            /*<FlashcardFolder
              element={element}
              name={folderName}
              path={path}
              folderKey={folderName + element.flashcardID}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              child={Object.entries(element).map(([key, value]) => renderElement(value, key, path))}
            />*/
            <FolderElement
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
        return Object.entries(visible).map(([key, value]) => renderElement(value, key))
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