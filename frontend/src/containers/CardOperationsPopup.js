import React from 'react';
import MenuItem from '../componments/MenuItem';

import renameIcon from '../static/rename-icon.svg';
import moveIcon from '../static/move-icon.svg';
import deleteIcon from '../static/bin-icon.svg';

import './CardOperationsPopup.css'

function CardOperationsPopup({ visible, showMovePopup, flashcardData, path, flashcardID }) {
    const menuItemStyle = {
        margin:"0px"
    }

    const cardData = {
        "flashcardData": flashcardData,
        "path": path,
        "flashcardID": flashcardID
    }
    return (
        visible ?
        <div className='card-operations-popup-wrapper'>
            <div className='card-operations-container'>
                <MenuItem text="Rename" imgUrl={renameIcon} margin="0px" />
                <MenuItem text="Move" imgUrl={moveIcon} margin="0px" onClick={() => {showMovePopup(cardData)}}/>
                <MenuItem text="Delete" imgUrl={deleteIcon} margin="0px" />
            </div>
        </div>
        : <></>
    );
}

export default CardOperationsPopup;