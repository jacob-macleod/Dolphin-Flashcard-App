import {React, useState} from 'react';
import UserProfileHeader from '../componments/UserProfileHeader';
import MenuItem from '../componments/MenuItem';
import AccountDropown from '../componments/AccountDropdown';
import dashboard_icon_white from '../static/dashboard-icon-white.svg';
import flashcard_icon from '../static/flashcard-icon.svg';
import community_icon from '../static/community-icon.svg';
import quests_icon from '../static/quests-icon.svg';
import leaderboard_icon from '../static/leaderboard-icon.svg';
import settings_icon from '../static/settings-icon.svg';
import './SidePanel.css';
import './GridItem.css';

function SidePanel () {
    const [accountDropdownVisibility, setAccountDropdownVisibility] = useState(false);
    const gridItemStyle = {
        width: "240px",
        padding: "0px"
    }

    return <div className='grid-item' style={gridItemStyle}>
        <div className="side-panel">
            <UserProfileHeader setAccountDropdownVisibility={ setAccountDropdownVisibility } accountDropdownVisibility={accountDropdownVisibility}/>
            <AccountDropown visible={accountDropdownVisibility}/>
            <MenuItem text="Dashboard" src="/dashboard" clicked={true} imgUrl={dashboard_icon_white}/>
            <MenuItem text="Flashcards" src="/flashcards" imgUrl={flashcard_icon}/>
            <MenuItem text="Community" src="/community" imgUrl={community_icon}/>
            <MenuItem text="Quests" src="/quests" imgUrl={quests_icon}/>
            <MenuItem text="Leaderboard" src="/leaderboard" imgUrl={leaderboard_icon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settings_icon}/>
        </div>
    </div>;
}

export default SidePanel;