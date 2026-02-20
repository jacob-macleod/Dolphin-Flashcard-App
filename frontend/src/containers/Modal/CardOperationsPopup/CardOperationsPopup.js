import React from 'react';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';
import editIcon from '../../../static/edit-icon.svg';

import './CardOperationsPopup.css'

const FlashcardHeader = ({ newSet, flashcardName, folder, type="editFlashcardHeader", flashcardID, numberStudying }) => {
    return (
    <div className='flashcard-set-header'>
        {
        type === "editFlashcardHeader"
        ? <p
            className='link'
            style={{ paddingLeft: "16px" }}
            onClick={() => {
            newSet === "true"
            ? window.open("/flashcards", "_self")
            : window.open("/view?flashcardName[]=" + flashcardName + "&folder[]=" + folder + "&flashcardID[]=" + flashcardID, "_self")
            }}
        >
            &lt; Back to {newSet === "true" ? "flashcards" : "studying"}
        </p>
        : <></>
        }
        <Paragraph text={
        folder === "" || folder === null
            ? '"Your Account > ' + flashcardName + '"'
            : numberStudying === 1
            ? folder.replace(/\//g, ' > ') + ' > ' + flashcardName + '"'
            : "\"Studying " + numberStudying + " flashcards\""
        } type="grey-italics" />
        {
        type === "studyFlashcard" && numberStudying === 1
        ? <p
            className='link'
            style={{ paddingLeft: "16px" }}
            onClick={() => { window.open("/edit-flashcard-set?flashcardName=" + flashcardName + "&folder=" + folder + "&flashcardID=" + flashcardID, "_self") }}
        >
            Edit Set
        </p>
        : <></>
        }
    </div>
    );
};

function CardOperationsPopup({ visible, showMovePopup, showDeleteConfirmation, setRenameFlashcardSetPopupVisible, flashcardData, path, flashcardName, view, folder, flashcardID }) {
    const float = view == "mobile" ? "left" : null;
    const cardData = {
        "flashcardData": {
            [flashcardName]: flashcardData
        },
        "path": path,
        "flashcardName": flashcardName
    };
    const customStyle = {
    padding: "2px",
    paddingLeft: "2px",
    };

    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'}>
            <div className='card-operations-container'>
                <MenuItem text="Rename" imgUrl={renameIcon} margin="0px" onClick={() => setRenameFlashcardSetPopupVisible(cardData)} float={float} style={customStyle}/>
                <MenuItem text="Edit" imgUrl={editIcon} onClick={() => {window.open("/edit-flashcard-set?flashcardName=" + flashcardName + "&folder=" + folder + "&flashcardID=" + flashcardID, "_self")}} margin="0px" float={float} style={customStyle}/>
                <MenuItem text="Move" imgUrl={moveIcon} margin="0px" onClick={() => {showMovePopup(cardData)}} float={float} style={customStyle}/>
                <MenuItem text="Delete" imgUrl={deleteIcon} onClick={() => {showDeleteConfirmation(cardData)}} margin="0px" float={float} style={customStyle}/>
            </div>
        </div>
        : <></>
    );
}
export { CardOperationsPopup, FlashcardHeader };