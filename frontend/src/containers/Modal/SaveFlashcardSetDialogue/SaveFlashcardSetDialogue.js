import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import FolderTreeView from '../../FolderTreeView';
import Paragraph from '../../../componments/Text/Paragraph';
import ErrorText from '../../../componments/Text/ErrorText';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import '../MoveFolderDialogue/MoveFolderDialogue.css'
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function SaveFlashcardSetDialogue({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisibility, setErrorMessageVisibility] = useState("none");
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisnle"); // If null, loading icon shows
    const [loadEditFlashcardPage, setLoadEditFlashcardPage] = useState(false);
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;
    const urlParams = new URLSearchParams(window.location.search);

    // When the flashcard name is chaned using the input box
    const onFlashcardNameChange = (event) => {
      setFlashcardName(event.target.value);
    };

    // When the flashcard description is chaned using the input box
    const onFlashcardDescriptionChange = (event) => {
      setFlashcardDescription(event.target.value);
    };

    useEffect(() => {
      /* Generate an error message when the user clicks "Save" */
      if (selectedPath === null) {
        setErrorMessage("Please select a folder!");
      } else if (urlParams.get("id") === undefined) {
        setErrorMessage("The URL does not store the ID as a parameter! Try searching for the flashcard again");
      } else if (document.cookie.indexOf('jwtToken=') == -1) {
        setErrorMessage("");
        window.open("/", "_self");
      }else {
        setErrorMessage(null);
      }
    }, [selectedPath]);

    function saveSet() {
      setErrorMessageVisibility("block");
      if (errorMessage === null) {
        if (selectedPath != null) {
          setLoadingIconVisible(null);
          apiManager.addFlashcardToFolder(
            getCookie("jwtToken"),
            urlParams.get("id"),
            selectedPath,
            setReload
          )
        }
      }
    }

    useEffect(() => {
      if (loadEditFlashcardPage != false) {
        setLoadingIconVisible(false);
        window.open(
          "/edit-flashcard-set?flashcardName="
          + flashcardName + "&folder=" + selectedPath
          + "&flashcardDescription=" + flashcardDescription
          + "&flashcardID=" + loadEditFlashcardPage.flashcardID,
          "_self"
        );
      }
    }, [loadEditFlashcardPage]);

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

      return (
        visible !== false ?
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              style={view !== "mobile" ? {height: "fit-content", width: "400px"} : {width: "400px"}}
            >
                <Heading3 text="Choose a folder:" />

                <div className="card-overview" style={{cursor: "pointer"}}>
                  <FolderTreeView visible={visible} selectedPath={selectedPath} setSelectedPath={setSelectedPath}/>
                </div>

                <ErrorText text={errorMessage} style={{ display: errorMessageVisibility}} />

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => {setErrorMessageVisibility("none"); setVisible(false)}} style={buttonStyle} />
                    <Button text="Save" onClick={saveSet} style={buttonStyle} />
                </div>

                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default SaveFlashcardSetDialogue;
