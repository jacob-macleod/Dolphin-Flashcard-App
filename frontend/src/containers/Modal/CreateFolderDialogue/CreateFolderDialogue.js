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

function CreateFolderDialogue({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [folderName, setFolderName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisibility, setErrorMessageVisibility] = useState("none");
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisnle"); // If null, loading icon shows
    const [loadEditFlashcardPage, setLoadEditFlashcardPage] = useState(false);
    const buttonStyle = {
        display: "inline-grid",
        margin: view !== "mobile" ? "0px 16px" : "8px 0px"
    }
    const flashcardID = visible.flashcardID;
    const currentPath = visible.path;

    // When the flashcard name is chaned using the input box
    const onFlashcardNameChange = (event) => {
      setFolderName(event.target.value);
    };


    useEffect(() => {
      /* Generate an error message when the user clicks "Submit" */
      if (selectedPath === null) {
        setErrorMessage("Please select a folder!");
      } else if (folderName === "") {
        setErrorMessage("Please enter a name!");
      } else {
        setErrorMessage(null);
      }
    }, [selectedPath, folderName]);

    function createSet() {
      setErrorMessageVisibility("block");
      if (errorMessage === null) {
        if (selectedPath != null) {
          setLoadingIconVisible(null);
          setFolderName("");
          setErrorMessageVisibility("none");
          
          // If selectedPath is not "", add a "/" to the end of the path
          if (selectedPath !== "") {
            var pathToUse = selectedPath + "/";
          } else {
            var pathToUse = selectedPath;
          }

          apiManager.createFolder(
            getCookie("jwtToken"),
            pathToUse + folderName,
            setVisible,
            setReload
          )
        }
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
              initial={view !== "mobile" ? "hidden" : ""}
              animate={view !== "mobile" ? "visible" : ""}
              exit={view !== "mobile" ? "exit" : ""}
              variants={view !== "mobile"? dropIn: null}
              style={view !== "mobile" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Choose a location:" />

                <div className="card-overview" style={{cursor: "pointer"}}>
                  <FolderTreeView visible={visible} selectedPath={selectedPath} setSelectedPath={setSelectedPath}/>
                </div>

                <Heading3 text="Choose other details:" />

                <div className={view !== "mobile" ? "input-container" : "input-container-mobile"}>
                    <Paragraph text="Name: " style={{ display: "flex", alignItems: "center" }} />
                    <input type="text" style={{width: "calc(100% - 32px)"}} className="input" value={folderName} onChange={onFlashcardNameChange} />
                </div>

                <ErrorText text={errorMessage} style={{ display: errorMessageVisibility}} />

                <div className={view !== "mobile" ? 'button-container' : 'button-container-mobile'}>
                    <GhostButton text="Cancel" onClick={() => {setErrorMessageVisibility("none"); setVisible(false)}} style={buttonStyle} view={view}/>
                    <Button text="Create" onClick={createSet} style={buttonStyle} view={view}/>
                </div>

                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default CreateFolderDialogue;
