import {React, useRef} from 'react';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import closeOnOutsideClick from '../../../hooks/closeOnOutsideClick';

import './FolderOperationsPopup.css'

function FolderOperationsPopup({ setVisible, visible, showDeleteConfirmation, setRenameFolderPopupVisible, flashcardData, path, flashcardName, view }) {
    const float = view == "mobile" ? "left" : null;
    const cardData = {
        "flashcardData": {
            [flashcardName]: flashcardData
        },
        "path": path,
        "flashcardName": flashcardName
    };

    const dropdownRef = useRef(null);

    closeOnOutsideClick(dropdownRef, setVisible);

    return (
        visible ?
        <div className={view == "mobile" ? 'folder-operations-popup-wrapper-mobile' : 'folder-operations-popup-wrapper'}>
            <div className='folder-operations-container'>
                <MenuItem text="Rename" imgUrl={renameIcon} margin="0px" onClick={() => setRenameFolderPopupVisible(cardData)} float={float}/>
                {
                    //<MenuItem text="Move" imgUrl={moveIcon} margin="0px" onClick={() => {showMovePopup(cardData)}} float={float}/>
                }
                <MenuItem text="Delete" imgUrl={deleteIcon} onClick={() => {showDeleteConfirmation(cardData)}} margin="0px" float={float}/>
            </div>
        </div>
        : <></>
    );
}

export default FolderOperationsPopup;