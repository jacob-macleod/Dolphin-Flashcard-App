import {React, useState} from 'react';
import { mediumTextMobile } from '../textSizes';
import Image from '../componments/Image';
import Heading5 from './Heading5';
import MobileSidePanel from '../containers/MobileSidePanel';
import greyHamburger from '../static/grey-hamburger-menu.svg';
import './HamburgerBar.css';
import { getCookie } from '../api/Authentication';

function HamburgerBar ({ menuVisible, setMenuVisible, selectedItem }) {
    const iconSize = "32px";

    function clickEvent() {
        setMenuVisible(true);
    };
    return <div className="hamburgerBar">
            {menuVisible == false ?
                <div className='profileBanner'>
                    <Image width={iconSize} height={iconSize} minWidth={iconSize} paddingLeft='16px'/>
                    <Heading5 text={getCookie("userName")} style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                    }}/>
                    <Image width={iconSize} height={iconSize} minWidth={iconSize} url={greyHamburger} onClick={clickEvent} paddingRight='16px'/>
                </div>
            : <></>}
            <MobileSidePanel visible={menuVisible} setVisible={setMenuVisible} selectedItem={selectedItem}/>
        </div>
}

export default HamburgerBar;