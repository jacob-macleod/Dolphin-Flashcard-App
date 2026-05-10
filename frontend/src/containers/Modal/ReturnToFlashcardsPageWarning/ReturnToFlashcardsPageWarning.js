import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function ReturnToFlashcardsPageWarning({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [loadingIconVisible, setLoadingIconVisible] = useState("visible"); // If null, loading icon shows
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }

    function returnToFlashcards() {
      window.location.href = `/flashcards`;
    }

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

      return (
        visible !== false ?
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              style={view == "desktop" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Are you sure you want to return to the flashcards page?" />
                <Paragraph text="You have unsaved changes that will be lost!" />
                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => setVisible(false)} style={buttonStyle} />
                    <Button text="Yes, return to flashcards" onClick={returnToFlashcards} style={buttonStyle} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default ReturnToFlashcardsPageWarning;