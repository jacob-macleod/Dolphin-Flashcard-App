import React from 'react';
import { motion } from 'framer-motion';
import { slideRight, flipVariants } from '../../animations/animations';
import './WhiteOverlay.css';
import Heading2 from '../Text/Heading2';

function WhiteOverlay({ children, style, isFlipped, flipOnClick = false, visible=true, onClick=null, className=null, header=null }) {
  return (
    <div className={className}>
      {visible ? <>
        {flipOnClick ? (
          <motion.div
            className="overlay"
            style={style}
            initial="hidden"
            animate={isFlipped ? 'visible' : 'hidden'}
            variants={flipVariants}
            onClick={() => {onClick !== null ? onClick() : null}}
          >
            <motion.div
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {header !== null ? <div className="header-wrapper">
                <Heading2 text={header} />
              </div>: <></>}
              <div className='overlay-content'>
                {children}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={"overlay " + className}
            style={style}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideRight}
            onClick={() => {onClick !== null ? onClick() : null}}
          >
            {header !== null ? <div className="header-wrapper">
              <Heading2 text={header} className="white-overlay-header"/>
            </div>: <></>}
            <div className={'overlay-content '  + (header === null ? "" : "overlay-content-header")}>
                {children}
              </div>
            </motion.div>
        )}
      </>: children}
    </div>
  );
}

export default WhiteOverlay;
