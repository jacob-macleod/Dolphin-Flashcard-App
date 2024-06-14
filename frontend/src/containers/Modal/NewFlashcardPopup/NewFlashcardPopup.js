import React from 'react';
import RichTextBox from '../../RichTextBox';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3';
import Modal from '../Modal';
import apiManager from '../../../api/Api';
import '../Modal.css';
import { getCookie } from '../../../api/Authentication';

function NewFlashcardPopup({ visible, setVisible, view }) {

    return (
        <Modal visible={visible} view={view}>
            <Heading3 text="Create a new flashcard:" />
            <RichTextBox text=""/>
            <RichTextBox text=""/>

            <div style={{display: "flex"}}>
                <GhostButton text="Cancel" onClick={() => setVisible(false)} />
                <Button text="Create" onClick={() => {}} />
            </div>
        </Modal>
    );
}

export default NewFlashcardPopup;
