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

function CreateFlashcardSetDialogue({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [flashcardName, setFlashcardName] = useState("");
    const [flashcardDescription, setFlashcardDescription] = useState("");
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

    // When the flashcard name is chaned using the input box
    const onFlashcardNameChange = (event) => {
      setFlashcardName(event.target.value);
    };

    // When the flashcard description is chaned using the input box
    const onFlashcardDescriptionChange = (event) => {
      setFlashcardDescription(event.target.value);
    };

    useEffect(() => {
      /* Generate an error message when the user clicks "Submit" */
      if (selectedPath === null) {
        setErrorMessage("Please select a folder!");
      } else if (flashcardName === "") {
        setErrorMessage("Please enter a name!");
      } else if (flashcardDescription === "") {
        setErrorMessage("Please enter a description!");
      } else {
        setErrorMessage(null);
      }
    }, [selectedPath, flashcardName, flashcardDescription]);

    function createSet() {
      setErrorMessageVisibility("block");
      if (errorMessage === null) {
        if (selectedPath != null) {
          setLoadingIconVisible(null);
          apiManager.createFlashcard(
            getCookie("jwtToken"),
            flashcardName,
            flashcardDescription,
            selectedPath,
            [],
            setLoadEditFlashcardPage
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
              style={view !== "mobile" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Choose a location:" />

                <div className="card-overview" style={{cursor: "pointer"}}>
                  <FolderTreeView visible={visible} selectedPath={selectedPath} setSelectedPath={setSelectedPath}/>
                </div>

                <Heading3 text="Choose other details:" />

                <div className="input-container" style={{ display: "flex", marginBottom: "4%" }}>
                    <Paragraph text="Name: " style={{ marginRight: "20%" }} />
                    <input type="text" className="input" placeholder='Folder name...' value={flashcardName} onChange={onFlashcardNameChange}/>
                </div>

                <div className="input-container" style={{ display: "flex" }}>
                    <Paragraph text="Description: " style={{ marginRight: "10%" }} />
                    <input type="text" className="input" placeholder='Folder description' value={flashcardDescription} onChange={onFlashcardDescriptionChange}/>
                </div>

                <ErrorText text={errorMessage} style={{ display: errorMessageVisibility}} />

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => {setErrorMessageVisibility("none"); setVisible(false)}} style={buttonStyle} />
                    <Button text="Create" onClick={createSet} style={buttonStyle} />
                </div>

                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default CreateFlashcardSetDialogue;
