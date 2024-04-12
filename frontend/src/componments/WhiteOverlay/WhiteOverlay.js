import React from 'react';
import {motion} from 'framer-motion';
import { slideRight } from '../../animations/animations';
import './WhiteOverlay.css'

function Text({ children, style }) {
    return (
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
    );
}

export default Text;