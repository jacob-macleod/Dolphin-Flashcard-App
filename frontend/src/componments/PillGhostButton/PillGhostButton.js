import React from 'react';
import { motion } from 'framer-motion';
import './PillGhostButton.css';

function PillGhostButton({ text, disabled = false, onClick = () => {}, style = {}, border = null, icon = null, view }) {
    const buttonStyle = {
        border: border,
        ...style,
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={disabled ? "pill-ghost-button-disabled" : "pill-ghost-button"}
            onClick={onClick}
            style={buttonStyle}
        >
            {icon && <img src={icon} alt="" style={{ width: '16px',height:'16px' }} />} 
            {text}
        </motion.button>
    );
}

export default PillGhostButton;