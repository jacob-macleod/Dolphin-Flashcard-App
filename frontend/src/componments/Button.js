import React from 'react';
import './Button.css'

function Button({ text, disabled=false, onClick=() => {}, style={}}) {
    return (
        <button
            className={ disabled ? "button-disabled" : "button" }
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    );
}

export default Button;