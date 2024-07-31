import {React, useEffect, useRef} from 'react';
import closeOnOutsideClick from '../../../hooks/closeOnOutsideClick';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import '../CardOperationsPopup/CardOperationsPopup.css';

function CardOperationsPopup({ visible, showEditPopup, setVisible, view, setInitialTerm, setInitialDefinition, front, back}) {
    const float = view == "mobile" ? "left" : null;
    const dropdownRef = useRef(null);

    closeOnOutsideClick(dropdownRef, setVisible);

    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'} style={{zIndex: 2, height: "104px"}}>
            <div className='card-operations-container'>
                <MenuItem text="Edit" src={window.location.href} imgUrl={renameIcon} margin="0px" float={float} onClick={() => {
                    console.log(front);
                    console.log(back);
                    setInitialTerm(front);
                    setInitialDefinition(back);
                    console.log("Showing popup")
                    showEditPopup(true)
                    console.log("Showin popup")
                }}/>
                <MenuItem text="Delete" src={window.location.href} imgUrl={deleteIcon} margin="0px" float={float} onClick={() => {
                    alert ("This hasn't been coded yet!");
                }}/>
            </div>
        </div>
        : <></>
    );
}

export default CardOperationsPopup;