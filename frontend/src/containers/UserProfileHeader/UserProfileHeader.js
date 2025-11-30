import { React } from 'react';
import Image from '../../componments/Image/Image';
import Heading5 from '../../componments/Text/Heading5/Heading5';
import dropdownArrow from '../../static/dropdown-arrow.svg';
import { getCookie } from '../../api/Authentication';

function UserProfileHeader({ setAccountDropdownVisibility, accountDropdownVisibility }) {
    const iconSize = "32px";
    const dropdownArrowSize = "16px";

    function handleClick() {
        setAccountDropdownVisibility(accountDropdownVisibility === true ? false : true);
    }

    return (
        <div style={{display: "inline-flex", alignContent: "center", alignItems: "center", padding: "16px"}}>
            <Image width={iconSize} height={iconSize} minWidth={iconSize}/>
            <Heading5 text={getCookie("userName")} style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                display: "inline-flex",
                alignItems: "center",
                textAlign: "center",
            }}/>
            <Image width={dropdownArrowSize} height={dropdownArrowSize} minWidth={dropdownArrowSize} url={dropdownArrow} onClick={handleClick} paddingRight='8px'/>
            <Image width={iconSize} height={iconSize} minWidth={iconSize} url={getCookie("profileImage")} borderRadius="50%" paddingRight='0px'/>
        </div>
    );
}

export default UserProfileHeader;