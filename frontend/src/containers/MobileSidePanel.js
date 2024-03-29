import {React, useState} from 'react';
import MenuItem from '../componments/MenuItem';
import dashboard_icon_white from '../static/dashboard-icon-white.svg';
import flashcard_icon from '../static/flashcard-icon.svg';
import community_icon from '../static/community-icon.svg';
import quests_icon from '../static/quests-icon.svg';
import leaderboard_icon from '../static/leaderboard-icon.svg';
import settings_icon from '../static/settings-icon.svg';
import settingsIcon from '../static/settings-icon.svg';
import signOutIcon from '../static/signout-icon.svg';
import { mediumTextMobile } from '../textSizes';
import './MobileSidePanel.css';
import './GridItem.css';

function MobileSidePanel ({visible, setVisible}) {
    function clickEvent() {
        setVisible(false);
    };

    return  visible==true ? <div className="side-panel-mobile">
            <p className="link" style={{fontSize: mediumTextMobile}} onClick={clickEvent}>Close</p>
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