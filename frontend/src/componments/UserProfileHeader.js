import { React, useState } from 'react';
import Image from '../componments/Image';
import Heading5 from './Heading5';
import dropdownArrow from '../static/dropdown-arrow.svg';
import { getCookie } from '../api/Authentication';

function UserProfileHeader({ setAccountDropdownVisibility, accountDropdownVisibility }) {
    const iconSize = "32px";
    const dropdownArrowSize = "16px";

    function handleClick() {
        setAccountDropdownVisibility(accountDropdownVisibility == true ? false : true);
    }

    return (
        <div style={{display: "inline-flex", alignContent: "center", padding: "16px"}}>
            <Image width={iconSize} height={iconSize} />
            <Heading5 text={getCookie("userName")} style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                display: "inline-flex",
                alignItems: "center",
            }}/>
            <Image width={dropdownArrowSize} height={dropdownArrowSize} url={dropdownArrow}/>
            <Image width={iconSize} height={iconSize} url={getCookie("profileImage")} borderRadius="50%" onClick={handleClick}/>
        </div>
    );
}

export default UserProfileHeader;