import React from 'react';
import './Heading2.css';

function Heading2({ text, color="black", style={}}) {

    return (
        <p className={color === "black" ? "heading2" : "heading2-grey"} style={style}>{text}</p>
    );
}

export default Heading2;