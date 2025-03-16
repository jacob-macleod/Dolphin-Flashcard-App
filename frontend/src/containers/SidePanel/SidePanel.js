import {React, useState} from 'react';
import UserProfileHeader from '../UserProfileHeader';
import MenuItem from '../MenuItem';
import AccountDropown from '../../componments/AccountDropdown';
import dashboard_icon_white from '../../static/dashboard-icon-white.svg';
import flashcard_icon from '../../static/flashcard-icon.svg';
import community_icon from '../../static/community-icon.svg';
import quests_icon from '../../static/quests-icon.svg';
import leaderboard_icon from '../../static/leaderboard-icon.svg';
import settings_icon from '../../static/settings-icon.svg';
import dashboard_icon from '../../static/dashboard-icon.svg';
import flashcard_icon_white from '../../static/flashcard-icon-white.svg';
import community_icon_white from '../../static/community-icon-white.svg';
import './SidePanel.css';
import '../../componments/GridItem/GridItem.css';
import { useTheme } from '../../context/ThemeContext';

function SidePanel ({ selectedItem }) {
    const [accountDropdownVisibility, setAccountDropdownVisibility] = useState(false);
    const gridItemStyle = {
        width: "240px",
        padding: "0px"
    }
    const { darkMode, toggleTheme } = useTheme();


    return <div className='grid-item' style={gridItemStyle}>
        <div className="side-panel">
            <UserProfileHeader setAccountDropdownVisibility={ setAccountDropdownVisibility } accountDropdownVisibility={accountDropdownVisibility}/>
            <AccountDropown setVisible={setAccountDropdownVisibility} visible={accountDropdownVisibility}/>
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
            <MenuItem 
                text="Toggle Theme" 
                onClick={toggleTheme}
                imgUrl={selectedItem == "settings" ? settings_icon : settings_icon}
            />
        </div>
    </div>;
}

export default SidePanel;