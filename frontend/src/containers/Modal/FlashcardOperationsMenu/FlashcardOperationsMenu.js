import {React, useEffect, useRef} from 'react';
import closeOnOutsideClick from '../../../hooks/closeOnOutsideClick';
import MenuItem from '../../MenuItem';
import apiManager from '../../../api/Api';
import { getCookie } from '../../../api/Authentication';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import '../CardOperationsPopup/CardOperationsPopup.css';

function CardOperationsPopup({ visible, showEditPopup, setVisible, view, setInitialTerm, setInitialDefinition, front, back, cardID, setLoadingIconVisible, setReload }) {
    const float = view == "mobile" ? "left" : null;
    const dropdownRef = useRef(null);

    closeOnOutsideClick(dropdownRef, setVisible);

    function deleteCard() {
        console.log(cardID);
        apiManager.deleteCard(
            getCookie("userID"),
            cardID,
            setLoadingIconVisible,
            setReload
        );
    }

    return (
        visible ?
        <div className={view == "mobile" ? 'card-operations-popup-wrapper-mobile' : 'card-operations-popup-wrapper'} style={{zIndex: 2, height: "104px"}}>
            <div className='card-operations-container'>
                <MenuItem text="Edit" src={window.location.href} imgUrl={renameIcon} margin="0px" float={float} onClick={() => {
                    setInitialTerm(front);
                    setInitialDefinition(back);
                    showEditPopup(true);
                }}/>
                <MenuItem text="Delete" src={window.location.href} imgUrl={deleteIcon} margin="0px" float={float} onClick={() => {
                    deleteCard();
                }}/>
            </div>
        </div>
        : <></>
    );
}

export default CardOperationsPopup;