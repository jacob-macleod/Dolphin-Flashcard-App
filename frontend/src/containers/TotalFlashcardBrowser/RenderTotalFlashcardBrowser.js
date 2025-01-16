import React, { useState, useEffect, useCallback } from 'react';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';
import Paragraph from '../../componments/Text/Paragraph';
import Image from '../../componments/Image/Image';
import GreyRightArrow from '../../static/grey-right-arrow.svg';
import GreyLeftArrow from '../../static/grey-left-arrow.svg';
import "./TotalFlashcardBrowser.css";
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
  hiddenLeft: { x: '-100%', opacity: 0, position: 'fixed' },
  hiddenRight: { x: '100%', opacity: 0, position: 'fixed' },
  visible: { x: 0, opacity: 1, position: 'relative' },
  exitLeft: { x: '-20%', width: "0px", opacity: 0, position: 'fixed' },
  exitRight: { x: '100%', opacity: 0, position: 'fixed' },
};

function RenderTotalFlashcardBrowser({ flashcardData, flashcardsExist, flashcardItems, individualCards, setFlashcardItems }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [leftButtonAnimation, setLeftButtonAnimation] = useState(false); // State for left button animation
  const [rightButtonAnimation, setRightButtonAnimation] = useState(false); // State for right button animation

  const leftButtonClick = useCallback(() => {
    setLeftButtonAnimation(true); // Trigger left button animation
    setTimeout(() => setLeftButtonAnimation(false), 300); // Reset left button animation after 300ms
    setDirection(-1);
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : individualCards.length - 1
    );
  }, [individualCards.length]);

  const rightButtonClick = useCallback(() => {
    setRightButtonAnimation(true); // Trigger right button animation
    setTimeout(() => setRightButtonAnimation(false), 300); // Reset right button animation after 300ms
    setDirection(1);
    setCurrentCardIndex((prevIndex) =>
      prevIndex < individualCards.length - 1 ? prevIndex + 1 : 0
    );
  }, [individualCards.length]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      leftButtonClick();
    } else if (event.key === 'ArrowRight') {
      rightButtonClick();
    }
  }, [leftButtonClick, rightButtonClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {flashcardItems && flashcardItems.length !== 0 ? (
        <>
          <div className="card-container" style={{ position: 'relative', height: '264px' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentCardIndex}
                custom={direction}
                variants={slideVariants}
                initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit={direction === 1 ? "exitRight" : "exitLeft"}
                transition={{ duration: 0.15 }}
              >
                {individualCards[currentCardIndex] ? (
                  <CardOverview
                    text={individualCards[currentCardIndex].front}
                    description={individualCards[currentCardIndex].back}
                    showTurnOverButton={true}
                    height="264px"
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="controls-panel">
            <Image
              url={GreyLeftArrow}
              onClick={leftButtonClick}
              className={leftButtonAnimation ? 'left-button-animation' : ''}
            />
            <Paragraph
              text={`${currentCardIndex + 1} / ${individualCards.length}`}
              type="grey"
            />
            <div style={{ position: 'relative' }}>
              <Image
                url={GreyRightArrow}
                onClick={rightButtonClick}
                className={rightButtonAnimation ? 'right-button-animation' : ''}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default RenderTotalFlashcardBrowser;
