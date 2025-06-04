import React from 'react';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import './CardOperationsPopup.css'
import { useNavigate } from 'react-router-dom';

function CardOperationsPopup({ visible, showMovePopup, showDeleteConfirmation, setRenameFlashcardSetPopupVisible, flashcardData, path, flashcardName, view }) {
    const navigate = useNavigate();
    const float = view == "mobile" ? "left" : null;

    const handleEdit = () => {

    const actualData = flashcardData?.flashcard_set || flashcardData;
    const flashcardID = actualData?.flashcardID || actualData?.flashcard_id;

    navigate(`/edit-flashcard-set?flashcardName=${encodeURIComponent(flashcardName)}&folder=${encodeURIComponent(path)}&flashcardID=${encodeURIComponent(flashcardID)}`);
};

    const cardData = {
        "flashcardData": {
            [flashcardName]: flashcardData
        },
        "path": path,
        "flashcardName": flashcardName
    };

  

    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'}>
            <div className='card-operations-container'>
                <MenuItem text="Rename" imgUrl={renameIcon} margin="0px" onClick={() => setRenameFlashcardSetPopupVisible(cardData)} float={float}/>
                <MenuItem text="Move" imgUrl={moveIcon} margin="0px" onClick={() => {showMovePopup(cardData)}} float={float}/>
                <MenuItem text="Delete" imgUrl={deleteIcon} onClick={() => {showDeleteConfirmation(cardData)}} margin="0px" float={float}/>
                <MenuItem text="Edit" imgUrl={deleteIcon} onClick={handleEdit} margin="0px" float={float}/>
                {/* Image url needs to be changed. Left it in for alignment */}

            </div>
        </div>
        : <></>
    );
}

export default CardOperationsPopup;