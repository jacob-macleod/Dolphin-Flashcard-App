import {React} from 'react';
import MenuItem from '../MenuItem';
import settingsIcon from '../../static/settings-icon.svg';
import signOutIcon from '../../static/signout-icon.svg';
import './AccountDropdown.css';

function AccountDropown({ visible }) {
    const menuItemMargin = "12px";

    return (
        visible === false ? null :
        <div className='account-dropdown-background'>
            <MenuItem text="Sign Out" src="/signout" margin={menuItemMargin} imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" margin={menuItemMargin} imgUrl={settingsIcon}/>
        </div>
    );
}

export default AccountDropown;