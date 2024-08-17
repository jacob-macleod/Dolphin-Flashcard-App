import {React, useRef} from 'react';
import MenuItem from '../../containers/MenuItem';
import settingsIcon from '../../static/settings-icon.svg';
import signOutIcon from '../../static/signout-icon.svg';
import closeOnOutsideClick from '../../hooks/closeOnOutsideClick';
import './AccountDropdown.css';

function AccountDropown({ setVisible, visible }) {
    const menuItemMargin = "12px";
    const dropdownRef = useRef(null);

    closeOnOutsideClick(dropdownRef, setVisible);

    function signOut() {
        // Clear all cookies
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
        // Reload the page
        window.location.reload();
    }

    return (
        visible === false ? null :
        <div className='account-dropdown-background'>
            <MenuItem text="Sign Out" onClick={() => {signOut()}} margin={menuItemMargin} imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" margin={menuItemMargin} imgUrl={settingsIcon}/>
        </div>
    );
}

export default AccountDropown;