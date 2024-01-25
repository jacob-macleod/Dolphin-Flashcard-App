import React from 'react';

function Image({ width="50px", height="50px", url="/favicon.ico", borderRadius="0px" }) {

    return (
        <img src={url} alt="Logo" style={{
            width: width,
            height: height,
            borderRadius: borderRadius
        }}/>
    );
}

export default Image;