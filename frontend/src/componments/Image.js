import React from 'react';

function Image({ width="50px", height="50px", url="/favicon.ico", borderRadius="0px", className="", onClick}) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <img className={className} src={url} alt="Logo" style={{
            width: width,
            height: height,
            borderRadius: borderRadius
        }} onClick={handleClick}/>
    );
}

export default Image;