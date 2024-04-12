import React from 'react';
import MenuItem from './MenuItem';

import renameIcon from '../static/rename-icon.svg';
import moveIcon from '../static/move-icon.svg';
import deleteIcon from '../static/bin-icon.svg';

import './CardOperationsPopup.css'

function CardOperationsPopup({ visible, showMovePopup, flashcardData, path, flashcardID, view }) {
    const float = view == "mobile" ? "left" : null;

    const cardData = {
        "flashcardData": flashcardData,
        "path": path,
        "flashcardID": flashcardID
    }
    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'}>
            <div className='card-operations-container'>
                <MenuItem text="Rename" imgUrl={renameIcon} margin="0px" float={float}/>
                <MenuItem text="Move" imgUrl={moveIcon} margin="0px" onClick={() => {showMovePopup(cardData)}} float={float}/>
                <MenuItem text="Delete" imgUrl={deleteIcon} margin="0px" float={float}/>
            </div>
        </div>
        : <></>
    );
}

export default CardOperationsPopup;