import React from 'react';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import '../CardOperationsPopup/CardOperationsPopup.css'

function AICardOperationsPopup({ visible, showDeleteConfirmation, flashcardData, path, view }) {
    const float = view == "mobile" ? "left" : null;
    const cardData = {
        // "flashcardData": {
        //     [flashcardName]: flashcardData
        // },
        "path": path,
        // "flashcardName": flashcardName
    };

    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'}>
            <div className='card-operations-container'>
                <MenuItem text="Edit" imgUrl={renameIcon} margin="0px" onClick={() => {showDeleteConfirmation(cardData)}}  float={float}/>
                <MenuItem text="Delete" imgUrl={deleteIcon} onClick={() => {showDeleteConfirmation(cardData)}} margin="0px" float={float}/>
            </div>
        </div>
        : <></>
    );
}

export default AICardOperationsPopup;