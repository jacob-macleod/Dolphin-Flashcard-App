import {React, useState, useEffect} from 'react';
import RichTextBox from '../../RichTextBox';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3';
import Modal from '../Modal';
import DelayedElement from '../../DelayedElement';
import apiManager from '../../../api/Api';
import '../Modal.css';
import { getCookie } from '../../../api/Authentication';

function NewFlashcardPopup({ visible, setVisible, view, flashcardData, flashcardItems, setFlashcardItems, folder }) {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [requestResponse, setRequestResponse] = useState("")
    const [loadingIconVisible, setLoadingIconVisible] = useState("visisble"); // If null, loading icon shows

    function createFlashcard() {
        var newFlashcardItems = flashcardItems;
        newFlashcardItems.push({front: term, back: definition});

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
    }

    useEffect(() => {
        console.log(requestResponse);
        setVisible(false);
        setLoadingIconVisible("visible");
    }, [requestResponse]);

    return (
        <Modal visible={visible} view={view} style={{height: "fit-content"}}>
            <Heading3 text="Create a new flashcard:" />
            <RichTextBox text="" type="Term:" flashcardData={term} setFlashcardData={setTerm}/>
            <RichTextBox text="" type="Definition:" flashcardData={definition} setFlashcardData={setDefinition}/>

            <div style={{display: "flex"}}>
                <GhostButton text="Cancel" onClick={() => setVisible(false)} />
                <Button text="Create" onClick={createFlashcard} />
            </div>

            <div className={"loading-icon-wrapper"}>
                <DelayedElement child={<></>} childValue={loadingIconVisible} />
            </div>
        </Modal>
    );
}

export default NewFlashcardPopup;
