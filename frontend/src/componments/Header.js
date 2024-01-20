import React from 'react';
import './Header.css'

function Header({ text }) {
    return (
        <p className="header">
            {text}
        </p>
    );
}

export default Header;