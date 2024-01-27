import {React, useEffect} from 'react';
import MenuItem from './MenuItem';
import settingsIcon from '../static/settings-icon.svg';
import signOutIcon from '../static/signout-icon.svg';
import './AccountDropdown.css';

function AccountDropown({ visible }) {
    return (
        visible == false ? null :
        <div className='account-dropdown-background'>
            <MenuItem text="Sign Out" src="/signout" imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" imgUrl={settingsIcon}/>
        </div>
    );
}

export default AccountDropown;