import React from 'react';
import './Heading3.css';

function Heading3({ text, style={}}) {

    return (
        <p className={"heading3"} style={style}>{text}</p>
    );
}

export default Heading3;