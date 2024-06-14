import {React, useEffect} from 'react';
import MenuItem from '../../MenuItem';

import renameIcon from '../../../static/rename-icon.svg';
import moveIcon from '../../../static/move-icon.svg';
import deleteIcon from '../../../static/bin-icon.svg';

import '../CardOperationsPopup/CardOperationsPopup.css';

function CardOperationsPopup({ visible, showEditPopup, setVisible, view, setInitialTerm, setInitialDefinition, front, back}) {
    const float = view == "mobile" ? "left" : null;

    useEffect(() => {
        const closeDropdown = e => {
            let targetElement = e.target;
    
            // Traverse up the DOM tree until we find a matching tag name or reach the document body
            while (targetElement && targetElement.tagName !== 'IMG') {
                targetElement = targetElement.parentNode;
            }
    
            // If targetElement is null, it means we reached the document body without finding a BUTTON element
            if (!targetElement) {
                setVisible(false);
            }
        };

        document.body.addEventListener('click', closeDropdown);

        return () => document.body.removeEventListener('click', closeDropdown);
    }, []);

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