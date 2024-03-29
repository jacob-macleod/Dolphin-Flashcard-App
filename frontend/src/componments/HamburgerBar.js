import {React, useState} from 'react';
import { mediumTextMobile } from '../textSizes';
import MobileSidePanel from '../containers/MobileSidePanel';
import './HamburgerBar.css';

function HamburgerBar ({menuVisible, setMenuVisible}) {
    function clickEvent() {
        setMenuVisible(true);
    };

    return <div className="hamburgerBar">
            {menuVisible == false ? <p className="link" style={{fontSize: mediumTextMobile}} onClick={clickEvent}>Open</p> : <></>}
            <MobileSidePanel visible={menuVisible} setVisible={setMenuVisible} />
        </div>
}

export default HamburgerBar;