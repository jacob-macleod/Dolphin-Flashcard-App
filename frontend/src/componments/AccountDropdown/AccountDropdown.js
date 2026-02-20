import {React, useRef} from 'react';
import MenuItem from '../../containers/MenuItem';
import settingsIcon from '../../static/settings-icon.svg';
import signOutIcon from '../../static/signout-icon.svg';
import closeOnOutsideClick from '../../hooks/closeOnOutsideClick';
import './AccountDropdown.css';

export function signOut() {
        // Clear all cookies
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
        // Reload the page
        window.location.reload();
    }


function AccountDropown({ setVisible, visible }) {
    const customStyle = {
    padding: "2px",
    paddingLeft: "5px",
    };
    const dropdownRef = useRef(null);

    closeOnOutsideClick(dropdownRef, setVisible);

   

    return (
        visible === false ? null :
        <div className='account-dropdown-background'>
            <MenuItem text="Sign Out" onClick={() => {signOut()}} style={customStyle} imgUrl={signOutIcon}/>
            <MenuItem text="Settings" src="/settings" style={customStyle} imgUrl={settingsIcon}/>
        </div>
    );
}
export default AccountDropown;