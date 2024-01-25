import React from 'react';
import './SmallText.css';

function SmallText({ text, style={} }) {

    return (
        <p className='small-text' style={style}>{text}</p>
    );
}

export default SmallText;