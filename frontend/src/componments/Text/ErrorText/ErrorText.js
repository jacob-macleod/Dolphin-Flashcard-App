import React from 'react';
import './ErrorText.css';

function ErrorText({ text, style={}}) {

    return (
        <p className="error-text" style={style}>{text}</p>
    );
}

export default ErrorText;