import React from 'react';
import './Header.css'

function Header({ text, style={}, color="blue"}) {
    const className = color==="black" ? "header-black" : "header-blue";
    return (
        <p className={className} style={style}>
            {text}
        </p>
    );
}

export default Header;