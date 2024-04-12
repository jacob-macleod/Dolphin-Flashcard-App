import React from 'react';
import './Paragraph.css'

function Paragraph({ text, style={}, onClick=null }) {
    return (
        <p className="paragraph" style={style} onClick={onClick}>
            {text}
        </p>
    );
}

export default Paragraph;