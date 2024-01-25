import React from 'react';
import './Header5.css';

function Heading5({ text, style={} }) {

    return (
        <p className='small-text' style={style}>{text}</p>
    );
}

export default Heading5;