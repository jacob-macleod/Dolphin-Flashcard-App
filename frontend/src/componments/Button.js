import React from 'react';
import './Button.css'

function Button({ text, disabled=false, onClick=() => {}}) {
    return (
        <button
            className={ disabled ? "button-disabled" : "button" }
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;