/* Show a loading icon till the icon loads */
import LoadingIcons from 'react-loading-icons'
import React from 'react';

function DelayedElement({ child, childValue }) {
    return (
        childValue == null
        ? <LoadingIcons.ThreeDots
            width="50px"
            height="fit-content"
            fill="#6A84C5"
        />
        : <div>{child}</div>
    );
}

export default DelayedElement;