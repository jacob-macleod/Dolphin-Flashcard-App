import React from 'react';
import './Header5.css';

function Heading5({ text, style={}, color="grey" }) {

    return (
        <p className={color === "grey" ? 'small-text' : 'small-text-black'} style={style}>{text}</p>
    );
}

export default Heading5;