import React from 'react';
import './Text.css'

function Text({ text }) {
    return (
        <p className="text" dangerouslySetInnerHTML={text}/>
    );
}

export default Text;