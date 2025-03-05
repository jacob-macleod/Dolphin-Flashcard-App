import React from 'react';
import './Heading4.css';

function Heading4({ text, style={}, color="black"}) {
    const className = color==="black" ? "heading4-black" : "heading4-blue";

    return (
        <p className={className} style={style}>{text}</p>
    );
}

export default Heading4;