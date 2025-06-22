import React from 'react';
import './Heading2.css';

function Heading2({ text, color="black", style={}, className=""}) {

    return (
        <p className={className === "" ? color === "black" ? "heading2" : "heading2-grey" : className} style={style}>{text}</p>
    );
}

export default Heading2;