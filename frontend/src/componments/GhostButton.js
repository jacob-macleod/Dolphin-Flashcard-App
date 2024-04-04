import React from 'react';
import {motion} from 'framer-motion';
import './GhostButton.css'

function GhostButton({ text, disabled=false, onClick=() => {}, style={}}) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={ disabled ? "ghost-button-disabled" : "ghost-button" }
            onClick={onClick}
            style={style}
        >
            {text}
        </motion.button>
    );
}

export default GhostButton;