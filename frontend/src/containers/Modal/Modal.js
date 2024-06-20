import React from 'react';
import {motion} from 'framer-motion';
import { dropIn } from '../../animations/animations';

function Modal({ visible, view, children, style }) {
    return (
        visible === false ? null :
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
                className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
                style={style}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default Modal;
