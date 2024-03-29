import {React, useState} from 'react';
import MenuItem from '../componments/MenuItem';
import Image from '../componments/Image';
import Heading5 from '../componments/Heading5';
import dashboard_icon_white from '../static/dashboard-icon-white.svg';
import flashcard_icon from '../static/flashcard-icon.svg';
import community_icon from '../static/community-icon.svg';
import quests_icon from '../static/quests-icon.svg';
import leaderboard_icon from '../static/leaderboard-icon.svg';
import settings_icon from '../static/settings-icon.svg';
import settingsIcon from '../static/settings-icon.svg';
import signOutIcon from '../static/signout-icon.svg';
import { mediumTextMobile } from '../textSizes';
import { getCookie } from '../api/Authentication';
import blueHamburger from '../static/blue-hamburger-menu.svg';
import './MobileSidePanel.css';
import './GridItem.css';
import '../componments/HamburgerBar.css';

function MobileSidePanel ({visible, setVisible}) {
    const iconSize = "32px";

    function clickEvent() {
        setVisible(false);
    };

    return  visible==true ? <div className="side-panel-mobile">
            <div className='profileBanner'>
                <Image width={iconSize} height={iconSize} minWidth={iconSize} paddingLeft='16px'/>
                <Heading5 text={getCookie("userName")} style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                }}/>
                <Image width={iconSize} height={iconSize} minWidth={iconSize} url={blueHamburger} onClick={clickEvent} paddingRight='16px'/>
            </div>
            <MenuItem text="Dashboard" src="/dashboard" clicked={true} imgUrl={dashboard_icon_white}/>
            <MenuItem text="Flashcards" src="/flashcards" imgUrl={flashcard_icon}/>
            <MenuItem text="Community" src="/community" imgUrl={community_icon}/>
            <MenuItem text="Quests" src="/quests" imgUrl={quests_icon}/>
            <MenuItem text="Leaderboard" src="/leaderboard" imgUrl={leaderboard_icon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settings_icon}/>
            <MenuItem text="Sign Out" src="/signout" imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settingsIcon}/>
        </div> : <></>;
}

export default MobileSidePanel;