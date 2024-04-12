import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import FolderElement from '../../FlashcardOverview/FlashcardFolder/FlashcardFolder';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import './MoveFolderDialogue.css'
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function MoveFolderDialogue({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisnle"); // If null, loading icon shows
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }
    const flashcardData = visible.flashcardData;
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;

    function moveFlashcard() {
      if (selectedPath != null) {
        setLoadingIconVisible(null);
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
      setLoadingIconVisible("visible");
    }, [visible]);

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
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              style={view == "desktop" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Choose a folder:" />

                <div className="card-overview">{Object.entries(flashcardData).map(([key, value]) => renderElement(value, key))}</div>

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => setVisible(false)} style={buttonStyle} />
                    <Button text="Move" onClick={moveFlashcard} style={buttonStyle} />
                </div>
                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default MoveFolderDialogue;