import React, { useState, useEffect, useCallback } from 'react';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';
import Paragraph from '../../componments/Text/Paragraph';
import Image from '../../componments/Image/Image';
import GreyRightArrow from '../../static/grey-right-arrow.svg';
import GreyLeftArrow from '../../static/grey-left-arrow.svg';
import ExpandIcon from '../../static/expand-icon.svg';
import ExitFullscreenIcon from '../../static/exit-fullscreen-icon.svg';
import "./TotalFlashcardBrowser.css";
import { motion, AnimatePresence } from 'framer-motion';
import GhostButton from '../../componments/GhostButton';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const leftButtonClick = useCallback(() => {
    setDirection(-1);
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : individualCards.length - 1
    );
  }, [individualCards.length]);

  const rightButtonClick = useCallback(() => {
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
    <div className={isFullscreen ? 'fullscreen' : ''}>
      {flashcardItems && flashcardItems.length !== 0 ? (
        <>
          <div className={`card-container ${isFullscreen ? 'fullscreen-card-container' : ''}`}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentCardIndex}
                custom={direction}
                variants={slideVariants}
                initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit={direction === 1 ? "exitRight" : "exitLeft"}
                transition={{ duration: 0.15 }}
                style={{ width: '100%', height: '100%' }}
              >
                {individualCards[currentCardIndex] ? (
                  <CardOverview
                    text={individualCards[currentCardIndex].front}
                    description={individualCards[currentCardIndex].back}
                    showTurnOverButton={true}
                    height={isFullscreen ? '100%' : '264px'}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
            {isFullscreen && (
              <div className="">
                     <Image url={GreyLeftArrow} onClick={leftButtonClick} className="arrow-left" />
                     <Image url={GreyRightArrow} onClick={rightButtonClick} className="arrow-right" />
              </div>
            )}
          </div>
          {!isFullscreen && (
            <div className="controls-panel">
              <Image url={GreyLeftArrow} onClick={leftButtonClick} />
              <Paragraph text={`${currentCardIndex + 1} / ${individualCards.length}`} type="grey" />
              <Image url={GreyRightArrow} onClick={rightButtonClick} />
              <Image url={ExpandIcon} onClick={toggleFullscreen} style={{height:"26px",width:"26px"}} className='expand-icon'/>                        
            </div>
          )}
          {isFullscreen &&(
            <GhostButton style={{position:'absolute',top:'10px',right:'10px' }} text="Exit Fullscreen" onClick={toggleFullscreen} icon={ExitFullscreenIcon}/>
          )}
        </>
      ) : null}
    </div>
  );
}

export default RenderTotalFlashcardBrowser;