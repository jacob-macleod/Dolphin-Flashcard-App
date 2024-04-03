import React, { useEffect, useState } from 'react';
import GhostButton from '../componments/GhostButton';
import Button from '../componments/Button';
import Heading3 from '../componments/Heading3';
import FolderElement from '../componments/FolderElement';
import apiManager from '../api/Api';
import {getCookie} from '../api/Authentication';
import './MoveFolderDialogue.css'
import './NewGoalPopup.css';
import { UNSAFE_ViewTransitionContext } from 'react-router-dom';
import DelayedElement from '../componments/DelayedElement';

function MoveFolderDialogue({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [loadingIconVisible, setLoadingIconVisible] = useState(null);
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }
    const flashcardData = visible.flashcardData;
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;

    function moveFlashcard() {
      if (selectedPath != null) {
        console.log("ABOUT TO MOVE...");
        apiManager.moveFlashcard(
          getCookie("userID"),
          currentPath,
          flashcardID,
          selectedPath,
          setVisible,
          setReload
        )
      }
    }

    useEffect(() => {
      console.log("USEEFFECT - Changed to ", selectedPath);
    }, [selectedPath]);

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
                    <Button text="Move" onClick={moveFlashcard} style={buttonStyle} />
                </div>
                <div style={{height: "min-content", paddingTop: "16px"}}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </div>
        </div>
        : null
    );
}

export default MoveFolderDialogue;