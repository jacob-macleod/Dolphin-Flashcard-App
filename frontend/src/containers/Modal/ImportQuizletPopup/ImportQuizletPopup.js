import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dropIn } from "../../../animations/animations";
import Heading3 from "../../../componments/Text/Heading3/Heading3";
import Paragraph from "../../../componments/Text/Paragraph";
import FolderTreeView from "../../FolderTreeView";
import ErrorText from "../../../componments/Text/ErrorText";
import GhostButton from "../../../componments/GhostButton";
import Button from "../../../componments/Button";
import DelayedElement from "../../DelayedElement";
import apiManager from "../../../api/Api";
import { getCookie } from "../../../api/Authentication";

const ImportQuizletPopup = ({ visible, setVisible, view, reload, setReload }) => {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [flashcards, setFlashcards] = useState("")
    const [flashcardName, setFlashcardName] = useState("")
    const [termDefSeparator, setTermDefSeparator] = useState(",")
    const [termSeparator, setTermSeparator] = useState("\n")
    const [loadingIconVisible, setLoadingIconVisible] = useState("visible");
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisibility, setErrorMessageVisibility] = useState("none");
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px",
        marginBottom: "8px",
        marginTop: "8px",
    };

    function clearFormData() {
      setSelectedPath(null)
      setFlashcards('')
      setFlashcardName('')
      setErrorMessage(null)
      setLoadingIconVisible('visible')
      setErrorMessageVisibility('none')
    }
   
    useEffect(() => {
        /* Generate an error message when the user clicks "Submit" */
        if (selectedPath === null) {
          setErrorMessage('Please select a folder!');
        } else if (flashcardName === '') {
          setErrorMessage('Please enter a name!');
        } else if (flashcards === '') {
          setErrorMessage('Please enter quizlet export!!');
        } else {
          setErrorMessage(null);
        }
      }, [selectedPath, flashcardName, flashcards]);

    async function importSet() {
        try {
            const validations = [
              { valid: flashcardName.trim(), message: 'Please enter a name!' },
              { valid: flashcards, message: 'Please enter quizlet export!' },
              { valid: selectedPath !== null, message: 'Please select a folder!'}
            ]

            const error = validations.find(el => !el.valid)
            if (error) {
              setErrorMessage(error.message)
              setErrorMessageVisibility("block")
              return;
            }

            setErrorMessage(null)
            setErrorMessageVisibility('none')
            setLoadingIconVisible(null)

            if (errorMessage === null) {
              if (selectedPath !== null) {
                await apiManager.importQuizletSet(
                  getCookie("jwtToken"),
                  selectedPath,
                  flashcards,
                  termDefSeparator,
                  termSeparator,
                  flashcardName,
                )
              }
            }

            setVisible(false),
            setReload(true),
            clearFormData()
        } catch (error) {
            console.error("Import Error: ", error)
            setErrorMessageVisibility("block")
        }
    }

  return visible !== false ? (
    <div
      className={view != "mobile" ? "darken-background" : "whiten-background"}
    >
      <motion.div
        className={
          view == "desktop"
            ? "popup-container"
            : view == "tablet"
            ? "popup-container-tablet"
            : "popup-container-mobile"
        }
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropIn}
        style={view !== "mobile" ? { height: "fit-content" } : null}
      >
        <div className={view === "mobile" ? "import-csv-modal-content" : ""}>
          <Heading3 text="Import Quizlet Set:" />

          <div
            className={
              view !== "mobile" ? "input-container" : "input-container-mobile"
            }
            style={{
              display: view == "mobile" ? "block" : "flex",
              marginBottom: "4%",
            }}
          >
            <Paragraph
              text="Name: "
              style={{
                marginRight: view === "mobile" ? "0px" : "20%",
                textAlign: view === "mobile" ? "left" : "center",
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Set name..."
              onChange={(e) => setFlashcardName(e.target.value)}
              style={{ width: "calc(100% - 32px)" }}
            />
          </div>

          <div
            className={
              view !== "mobile" ? "input-container" : "input-container-mobile"
            }
          >
            <label
              style={{
                marginRight: '2.5rem'
              }}
            >Flashcards: </label>
            <textarea cols="40" rows="5" style={{ resize: "none", width: "calc(100% - 32px)" }} className="input" placeholder='Quizlet Export...' onChange={(e) => setFlashcards(e.target.value)}  />
          </div>

          

          <Heading3 text="Choose a location:" />

          <div className="card-overview" style={{ cursor: "pointer" }}>
            <FolderTreeView
              visible={visible}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
            />
          </div>

          <ErrorText
            text={errorMessage}
            style={{ display: errorMessageVisibility }}
          />

          <div
            className={
              view !== "mobile" ? "button-container" : "button-container-mobile"
            }
          >
            <GhostButton
              text="Cancel"
              onClick={() => {
                clearFormData();
                setErrorMessageVisibility("none");
                setVisible(false);
              }}
              style={buttonStyle}
              view={view}
            />
            <Button text="Create" style={buttonStyle} view={view} onClick={importSet}/>
          </div>

          <div className={"loading-icon-wrapper"}>
            <DelayedElement child={<></>} childValue={loadingIconVisible} />
          </div>
        </div>
      </motion.div>
    </div>
  ) : null;
}
export default ImportQuizletPopup