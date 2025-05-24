import React from 'react';
import { motion } from 'framer-motion';
import './GhostButton.css';

function GhostButton({ text, disabled = false, onClick = () => {}, style = {}, border = null, icon = null, view }) {
    const buttonStyle = {
        border: border,
        ...style,
        width: view === "mobile" ? "100%" : "auto",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={disabled ? "ghost-button-disabled" : "ghost-button"}
            onClick={onClick}
            style={buttonStyle}
        >
            {icon && <img src={icon} alt="" style={{ width: '16px',height:'16px' }} />} 
            {text}
        </motion.button>
    );
}

export default GhostButton;