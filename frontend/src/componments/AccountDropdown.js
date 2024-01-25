import {React, useEffect} from 'react';
import MenuItem from './MenuItem';
import './AccountDropdown.css';

function AccountDropown({ visible }) {
    return (
        visible == false ? null :
        <div className='account-dropdown-background'>
            <MenuItem text="Sign Out" src="/signout" imgUrl=""/>
            <MenuItem text="Settings" src="/settings" imgUrl=""/>
        </div>
    );
}

export default AccountDropown;