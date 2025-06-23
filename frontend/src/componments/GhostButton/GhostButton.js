import React from 'react';
import { motion } from 'framer-motion';
import './GhostButton.css';

function GhostButton({
  text,
  disabled = false,
  onClick = () => {},
  style = {},
  border = null,
  icon = null,
  view,
}) {
  const buttonStyle = {
    border: border,
    ...style,
    width: view === 'mobile' ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 0.95 : 0.9 }}
      className={disabled ? 'ghost-button-disabled' : 'ghost-button'}
      onClick={disabled ? () => {} : onClick}
      style={buttonStyle}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            width: '16px',
            height: '16px',
            // verticalAlign: 'text-top'
          }}
        />
      )}
      {text}
    </motion.button>
  );
}

export default GhostButton;
