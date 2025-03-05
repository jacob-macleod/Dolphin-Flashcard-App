import React from 'react';
import './Paragraph.css'

function Paragraph({ text, style={}, type="paragraph", onClick=null }) {
    return (
        <p className={type} style={style} onClick={onClick}>
            {text}
        </p>
    );
}

export default Paragraph;