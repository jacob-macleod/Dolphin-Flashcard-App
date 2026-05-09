import React from 'react';

function Image({
  width = '50px',
  minWidth = '25px',
  height = '50px',
  url = '/favicon.ico',
  borderRadius = '0px',
  className = '',
  onClick,
  paddingRight = '10px',
  paddingLeft = '0px',
  paddingBottom = '0px',
  paddingTop = '0px',
  marginBottom = '0px',
  marginTop = '0px',
  objectFit = 'fill',
  cursor = undefined,
  style = {},
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <img
      className={className}
      src={url}
      alt="Logo"
      style={{
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
        cursor: cursor !== undefined ? cursor : onClick != undefined ? 'pointer' : 'auto',
        ...style,
      }}
      onClick={handleClick}
    />
  );
}

export default Image;
