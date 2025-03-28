import React from 'react';
import {motion} from 'framer-motion';
import './Button.css'

function Button({ text, disabled=false, onClick=() => {}, style={}, view="desktop"}) {
    style = {
        ...style,
        width: view === "mobile" ? "100%" : "auto",
    }
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={ disabled ? "button-disabled" : "button" }
            onClick={disabled ? () => {} : onClick}
            style={style}
        >
            {text}
        </motion.button>
    );
}

export default Button;