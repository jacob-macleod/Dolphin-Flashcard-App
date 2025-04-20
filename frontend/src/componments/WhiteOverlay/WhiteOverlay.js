import React from 'react';
import { motion } from 'framer-motion';
import { slideRight, flipVariants } from '../../animations/animations';
import './WhiteOverlay.css';

function WhiteOverlay({ children, style, isFlipped, flipOnClick = false, visible=true, onClick=null, className=null }) {
  return (
    <div onClick={() => {onClick !== null ? onClick() : null}} className={className}>
      {visible ? <>
        {flipOnClick ? (
          <motion.div
            className="overlay"
            style={style}
            initial="hidden"
            animate={isFlipped ? 'visible' : 'hidden'}
            variants={flipVariants}
          >
            <motion.div
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="overlay"
            style={style}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideRight}
          >
            {children}
          </motion.div>
        )}
      </>: children}
    </div>
  );
}

export default WhiteOverlay;
