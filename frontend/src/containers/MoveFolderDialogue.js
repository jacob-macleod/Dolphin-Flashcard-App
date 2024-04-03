import React from 'react';
import GhostButton from '../componments/GhostButton';
import Button from '../componments/Button';
import Heading3 from '../componments/Heading3';
import FolderElement from '../componments/FolderElement';
import apiManager from '../api/Api';
import getCookie from '../api/Authentication';
import './MoveFolderDialogue.css'
import './NewGoalPopup.css';
import { UNSAFE_ViewTransitionContext } from 'react-router-dom';

function MoveFolderDialogue({ visible, setVisible, view }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }
    const flashcardData = visible.flashcardData;
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;

    function moveFlashcard() {
      /*apiManager.moveFlashcard(
        getCookie("userID"),

      )*/
    }

    const renderElement = (element, folderName, path="") => {
        if (path !== "") {
            path = path + "/" + folderName;
        } else {
            path = folderName;
        }

        if (element.cards) {
        } else {
          return (
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

      return (
        visible !== false ?
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <div className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}>
                <Heading3 text="Choose a folder:" />

                <div>{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => setVisible(false)} style={buttonStyle} />
                    <Button text="Move" onClick={() => {}} style={buttonStyle} />
                </div>
            </div>
        </div>
        : null
    );
}

export default MoveFolderDialogue;