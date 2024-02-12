import React from 'react';

function Image({
    width="50px",
    height="50px",
    url="/favicon.ico",
    borderRadius="0px",
    className="",
    onClick,
    paddingRight="10px",
    paddingBottom="0px",
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
            height: height,
            borderRadius: borderRadius,
            paddingBottom: paddingBottom,
            paddingRight: paddingRight,
            marginBottom: marginBottom,
            marginTop: marginTop,
            objectFit: objectFit
        }} onClick={handleClick}/>
    );
}

export default Image;