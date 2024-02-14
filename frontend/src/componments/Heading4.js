import React from 'react';
import './Heading4.css';

function Heading4({ text, style={} }) {

    return (
        <p className='heading4' style={style}>{text}</p>
    );
}

export default Heading4;