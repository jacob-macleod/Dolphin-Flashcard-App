import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

function Button({
  text,
  disabled = false,
  onClick = () => {},
  style = {},
  icon = null,
  view = 'desktop',
}) {
  style = {
    ...style,
    width: view === 'mobile' ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 0.95 : 0.9 }}
      className={disabled ? 'button-disabled' : 'button'}
      onClick={disabled ? () => {} : onClick}
      style={style}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            width: '16px',
            height: '16px',
            verticalAlign: 'text-top',
          }}
        />
      )}
      {text}
    </motion.button>
  );
}

export default Button;
