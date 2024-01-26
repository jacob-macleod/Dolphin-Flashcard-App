import React from 'react';
import './Paragraph.css'

function Paragraph({ text }) {
    return (
        <p className="paragraph">
            {text}
        </p>
    );
}

export default Paragraph;