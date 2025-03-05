import React from 'react';
import './BoldParagraph.css'

function BoldParagraph({ text }) {
    return (
        <p className="bold-paragraph">
            {text}
        </p>
    );
}

export default BoldParagraph;