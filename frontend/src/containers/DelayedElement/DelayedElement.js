/* Show a loading icon till the icon loads */
import LoadingIcons from 'react-loading-icons'
import {motion} from 'framer-motion';
import { zoomIn } from '../../animations/animations';
import React, { useEffect } from 'react';

function DelayedElement({ child, childValue }) {
    return (
        childValue == null
        ? <LoadingIcons.ThreeDots
            width="50px"
            height="fit-content"
            fill="#6A84C5"
        />
        : <motion.div
            initial="hide"
            animate={childValue != null ? "show" : "hide"}
            exit="exit"
            variants={zoomIn}
        >{child}</motion.div>
    );
}

export default DelayedElement;