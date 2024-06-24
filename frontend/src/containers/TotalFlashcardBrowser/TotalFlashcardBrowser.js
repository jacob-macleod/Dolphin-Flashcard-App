import React, { useState, useEffect } from 'react';
import useFlashcardDataForMultipleCards from '../../hooks/getFlashcardDataForMultipleCards';
import '../../App.css';
import CardOverview from '../CardOverview/CardOverview';
import Paragraph from '../../componments/Text/Paragraph';
import Image from '../../componments/Image/Image';
import GreyRightArrow from '../../static/grey-right-arrow.svg';
import GreyLeftArrow from '../../static/grey-left-arrow.svg';
import "../../componments/Text/Link/Link.css";
import "./TotalFlashcardBrowser.css";
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
  hiddenLeft: { x: '-100%', opacity: 0, position: 'fixed' },
  hiddenRight: { x: '100%', opacity: 0, position: 'fixed' },
  visible: { x: 0, opacity: 1, position: 'relative',  },
  exitLeft: { x: '-20%', width: "0px", opacity: 0, position: 'fixed' },
  exitRight: { x: '100%', opacity: 0, position: 'fixed' },
};

function TotalFlashcardBrowser({ folder, flashcardName, flashcardID }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const {
    flashcardData,
    flashcardsExist,
    flashcardItems,
    individualCards,
    setFlashcardItems,
  } = useFlashcardDataForMultipleCards(folder, flashcardID, "", flashcardName);

  function leftButtonClick() {
    setDirection(-1);
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : individualCards.length - 1
    );
  }

  function rightButtonClick() {
    setDirection(1);
    setCurrentCardIndex((prevIndex) =>
      prevIndex < individualCards.length - 1 ? prevIndex + 1 : 0
    );
  }

  useEffect(() => {
    console.log("Direction is ", direction);
  }, [direction]);

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
            <Image url={GreyLeftArrow} onClick={leftButtonClick} />
            <Paragraph
              text={`${currentCardIndex + 1} / ${individualCards.length}`}
              type="grey"
            />
            <Image url={GreyRightArrow} onClick={rightButtonClick} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default TotalFlashcardBrowser;
