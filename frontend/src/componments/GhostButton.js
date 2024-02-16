import React from 'react';
import './GhostButton.css'

function GhostButton({ text, disabled=false, onClick=() => {}, style={}}) {
    return (
        <button
            className={ disabled ? "ghost-button-disabled" : "ghost-button" }
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    );
}

export default GhostButton;