import React from 'react';

function Image({
    width="50px",
    minWidth="50px",
    height="50px",
    url="/favicon.ico",
    borderRadius="0px",
    className="",
    onClick,
    paddingRight="10px",
    paddingLeft="0px",
    paddingBottom="0px",
    paddingTop="0px",
    marginBottom="0px",
    marginTop="0px",
    objectFit="fill"
}) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <img className={className} src={url} alt="Logo" style={{
            width: width,
            minWidth: minWidth,
            height: height,
            borderRadius: borderRadius,
            paddingBottom: paddingBottom,
            paddingTop: paddingTop,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            marginBottom: marginBottom,
            marginTop: marginTop,
            objectFit: objectFit,
            cursor: onClick != undefined ? "pointer" : "auto"
        }} onClick={handleClick}/>
    );
}

export default Image;