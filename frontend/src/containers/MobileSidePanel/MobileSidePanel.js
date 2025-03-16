import {React, useState} from 'react';
import MenuItem from '../MenuItem';
import Image from '../../componments/Image/Image';
import Heading5 from '../../componments/Text/Heading5/Heading5';
import dashboard_icon_white from '../../static/dashboard-icon-white.svg';
import flashcard_icon from '../../static/flashcard-icon.svg';
import community_icon from '../../static/community-icon.svg';
import quests_icon from '../../static/quests-icon.svg';
import leaderboard_icon from '../../static/leaderboard-icon.svg';
import settings_icon from '../../static/settings-icon.svg';
import settingsIcon from '../../static/settings-icon.svg';
import signOutIcon from '../../static/signout-icon.svg';
import { getCookie } from '../../api/Authentication';
import blueHamburger from '../../static/blue-hamburger-menu.svg';
import dashboard_icon from '../../static/dashboard-icon.svg';
import flashcard_icon_white from '../../static/flashcard-icon-white.svg'
import community_icon_white from '../../static/community-icon-white.svg';
import './MobileSidePanel.css';
import '../../componments/GridItem/GridItem.css';
import '../HamburgerBar/HamburgerBar.css';
import { useTheme } from '../../context/ThemeContext';

function MobileSidePanel ({visible, setVisible, selectedItem}) {
    const iconSize = "32px";

    function clickEvent() {
        setVisible(false);
    };

    const { darkMode, toggleTheme } = useTheme();

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
            <MenuItem
                text="Dashboard"
                src="/dashboard"
                clicked={selectedItem == "dashboard" ? true : false}
                imgUrl={selectedItem == "dashboard" ? dashboard_icon_white : dashboard_icon}
            />
            <MenuItem
                text="Flashcards"
                src="/flashcards"
                clicked={selectedItem == "flashcards" ? true : false}
                imgUrl={selectedItem == "flashcards" ? flashcard_icon_white : flashcard_icon}
            />
            <MenuItem
                text="Community"
                src="/community"
                clicked={selectedItem == "community" ? true : false}
                imgUrl={selectedItem == "community" ? community_icon_white : community_icon}
            />
            <MenuItem text="Quests" src="/quests" imgUrl={quests_icon}/>
            <MenuItem text="Leaderboard" src="/leaderboard" imgUrl={leaderboard_icon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settings_icon}/>
            <MenuItem text="Sign Out" src="/signout" imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settingsIcon}/>
            <MenuItem 
                text="Toggle Theme" 
                onClick={toggleTheme}
                imgUrl={selectedItem == "settings" ? settings_icon : settings_icon}
            />
        </div> : <></>;
}

export default MobileSidePanel;
