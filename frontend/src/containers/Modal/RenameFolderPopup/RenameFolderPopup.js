import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph';
import ErrorText from '../../../componments/Text/ErrorText';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import '../MoveFolderDialogue/MoveFolderDialogue.css'
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function RenameFolderPopup({ visible, setVisible, view, setReload }) {
    const [newFlashcardName, setNewFlashcardName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisibility, setErrorMessageVisibility] = useState("none");
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisnle"); // If null, loading icon shows
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;

    // When the flashcard name is chaned using the input box
    const onFlashcardNameChange = (event) => {
      setNewFlashcardName(event.target.value);
    };


    useEffect(() => {
      /* Generate an error message when the user clicks "Rename" */
      if (newFlashcardName === "") {
        setErrorMessage("Please enter a name!");
      } else {
        setErrorMessage(null);
      }
    }, [newFlashcardName]);

    function createSet() {
      setErrorMessageVisibility("block");
      if (errorMessage === null) {
        setLoadingIconVisible(null);
        setNewFlashcardName("");
        setErrorMessageVisibility("none");

        // visible stores flashcardData which contains the data for the flashcard
        // in the format flashcard_name: {flashcard data including ID}. This will only ever
        // store the data for one flashcard. Below gets the flashcard ID
        const flashcardName = Object.keys(visible["flashcardData"])[0];

        apiManager.renameFolder(
          getCookie("userID"),
          flashcardName,
          newFlashcardName,
          setVisible,
          setReload
        )
      }
    }

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
                <Heading3 text="Enter a new name:" />

                <Paragraph text={"The folder is currently called '" + Object.keys(visible["flashcardData"])[0] + "'"} />

                <div className="input-container">
                    <Paragraph text="Name: " style={{ display: "flex", alignItems: "center" }} />
                    <input type="text" className="input" value={newFlashcardName} onChange={onFlashcardNameChange}/>
                </div>

                <ErrorText text={errorMessage} style={{ display: errorMessageVisibility}} />

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => {setErrorMessageVisibility("none"); setVisible(false)}} style={buttonStyle} />
                    <Button text="Rename" onClick={createSet} style={buttonStyle} />
                </div>

                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default RenameFolderPopup;
