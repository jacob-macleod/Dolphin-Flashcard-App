import React from 'react';
import './Paragraph.css'

function Paragraph({ text, style={} }) {
    return (
        <p className="paragraph" style={style}>
            {text}
        </p>
    );
}

export default Paragraph;