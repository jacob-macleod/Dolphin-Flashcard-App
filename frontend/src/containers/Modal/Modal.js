import React from 'react';
import {motion} from 'framer-motion';
import { dropIn } from '../../animations/animations';

function Modal({ visible, view, children, style }) {
    return (
        visible === false ? null :
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            {view !== "mobile"
            ?
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial={view !== "mobile" ? "hidden" : ""}
              animate={view !== "mobile" ? "visible" : ""}
              exit={view !== "mobile" ? "exit" : ""}
              variants={view !== "mobile"? dropIn: null}
              style={style}
            >
                {children}
            </motion.div>
            :
            <div
                className={view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
                style={style}
            >
                {children}
            </div>
            }
        </div>
    );
}

export default Modal;
