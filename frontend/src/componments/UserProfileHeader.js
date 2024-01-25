import React from 'react';
import Image from '../componments/Image';
import SmallText from '../componments/SmallText';
import { getCookie } from '../api/Authentication';

function UserProfileHeader() {
    const iconSize = "30px";

    return (
        <div style={{display: "inline-flex", alignContent: "center", padding: "10px"}}>
            <Image width={iconSize} height={iconSize} />
            <SmallText text={getCookie("userName")} style={{
                paddingLeft: "8px",
                paddingRight: "8px"
            }}/>
            <Image width={iconSize} height={iconSize} url={getCookie("profileImage")} borderRadius="50%"/>
        </div>
    );
}

export default UserProfileHeader;