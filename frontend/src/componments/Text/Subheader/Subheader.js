import React from 'react';
import './Subheader.css'

function Subheader({ text }) {
    return (
        <p className="subheader">
            {text}
        </p>
    );
}

export default Subheader;