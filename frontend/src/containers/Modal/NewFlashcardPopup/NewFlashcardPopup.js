import {React, useState, useEffect} from 'react';
import RichTextBox from '../../RichTextBox';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3';
import Modal from '../Modal';
import DelayedElement from '../../DelayedElement';
import apiManager from '../../../api/Api';
import '../Modal.css';
import './NewFlashcardPopup.css';
import { getCookie } from '../../../api/Authentication';

function NewFlashcardPopup({
    visible,
    setVisible,
    view,
    flashcardData,
    flashcardItems,
    setFlashcardItems,
    folder,
    editExistingFlashcard=false,
    initialTerm="",
    initialDefinition=""
    }) {
    const [term, setTerm] = useState(initialTerm);
    const [definition, setDefinition] = useState(initialDefinition);
    const [requestResponse, setRequestResponse] = useState("")
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisble"); // If null, loading icon shows

    function removeQueryParameter(url, param) {
        let urlObj = new URL(url);
        let params = new URLSearchParams(urlObj.search);
      
        // Remove the specified query parameter
        params.delete(param);
      
        // Reconstruct the URL without the removed parameter
        urlObj.search = params.toString();
      
        return urlObj.toString();
    }

    function createFlashcard() {
        var newFlashcardItems = flashcardItems;
        // If the flashcard is being added, append the new data
        if (!editExistingFlashcard) {
            newFlashcardItems.push({front: term, back: definition});
        } else {
            // If the flashcard is being edited, replace the data
            for (var i = 0; i < newFlashcardItems.length; i++) {
                if (newFlashcardItems[i].front === initialTerm && newFlashcardItems[i].back === initialDefinition) {
                    newFlashcardItems[i].front = term;
                    newFlashcardItems[i].back = definition;
                }
            }
        }

        var flashcardDataRequest = {}
        flashcardDataRequest.cards = newFlashcardItems;
        flashcardDataRequest.userID = getCookie("userID");
        flashcardDataRequest.flashcardName = flashcardData.name;
        flashcardDataRequest.flashcardDescription = flashcardData.description;
        flashcardDataRequest.folder = folder;
        apiManager.createFlashcard(
            getCookie("userID"),
            flashcardData.name,
            flashcardData.description,
            folder,
            newFlashcardItems,
            setRequestResponse
        );
        setLoadingIconVisible(null);
        setFlashcardItems(newFlashcardItems);
        
        // If the page has just been created, reload the page without the newSet parameter
        if (!editExistingFlashcard) {
            window.open(
                removeQueryParameter(window.location.href, 'newSet'),
                "_self"
            );
        }

    }

    useEffect(() => {
        setVisible(false);
        setLoadingIconVisible("visible");
    }, [requestResponse]);

    useEffect(() => {
        setTerm(initialTerm);
        setDefinition(initialDefinition);
    }, [visible, initialTerm, initialDefinition])

    const buttonStyle = {
        marginLeft: "8px",
        marginRight: "8px"
    }

    return (
        <Modal visible={visible} view={view} style={{height: "fit-content", width: "100%", maxWidth: "1000px"}}>
            <Heading3 text={editExistingFlashcard ? "Edit flashcard:" : "Create a new flashcard:"} />
            <div className={view !== "desktop" ? "text-box-container-mobile" : "text-box-container"}>
                <RichTextBox text="" type="Term:" flashcardData={term} setFlashcardData={setTerm} view={view}/>
                <RichTextBox text="" type="Definition:" flashcardData={definition} setFlashcardData={setDefinition} view={view}/>
            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <GhostButton text="Cancel" onClick={() => setVisible(false)} style={buttonStyle}/>
                <Button text={editExistingFlashcard ? "Update" : "Create"} onClick={createFlashcard} style={buttonStyle}/>
            </div>

            <div className={"loading-icon-wrapper"}>
                <DelayedElement child={<></>} childValue={loadingIconVisible} />
            </div>
        </Modal>
    );
}

export default NewFlashcardPopup;
