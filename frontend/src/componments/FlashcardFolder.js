import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import Image from './Image';
import Paragraph from './Paragraph';
import Heading5 from './Heading5';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import ReviewBarChart from './ReviewBarChart';
import Button from './Button';
import { easeIn } from '../animations/animations';

import horizontalTriangle from '../static/horizontal-triangle.svg';
import verticalTriangle from '../static/vertical-triangle.svg';
import threeDots from '../static/three-dots.svg'

import './FlashcardFolder.css';
import './FlashcardItem.css';

function FlashcardFolder({ element, name, child, folderKey, view }) {
    const gridItemStyle = {
        padding: "0px",
    }

    const [showChildren, setShowChildren] = useState(false);
    const [cardsCount, setCardsCount] = useState(0);
    const [studyingCount, setStudyingCount] = useState(0);
    const [recappingCount, setRecappingCount] = useState(0);
    const [notStartedCount, setNotStartedCount] = useState(0);

    function toggleChildren() {
        setShowChildren(!showChildren);
    }

    function studyCard() {
        alert ("Clicked!");
    }

    function countCards(data) {
        let cards = 0;
        let studying = 0;
        let recapping = 0;
        let notStarted = 0;

        Object.values(data).forEach(item => {
            if (item.cards) {
                cards += Object.keys(item.cards).length;

                Object.values(item.cards).forEach(card => {
                    let reviewStatus = parseFloat(card.reviewStatus);
                    if (reviewStatus === 0.0) {
                        notStarted++;
                    } else if (reviewStatus < 1.0) {
                        studying++;
                    } else {
                        recapping++;
                    }
                });
            } else {
                const { cards: subCards, studying: subStudying, recapping: subRecapping, notStarted: subNotStarted } = countCards(item);
                cards += subCards;
                studying += subStudying;
                recapping += subRecapping;
                notStarted += subNotStarted;
            }
        });

        return { cards, studying, recapping, notStarted };
    }

    useEffect(() => {
        const { cards, studying, recapping, notStarted } = countCards(element);
        setCardsCount(cards);
        setStudyingCount(studying);
        setRecappingCount(recapping);
        setNotStartedCount(notStarted);
    }, [element]);

    return (
        <div
            key={folderKey}
            className='folder-wrapper'
        >
            <GridContainer
                classType="flashcard-overview"
                layout={view == "desktop" ? "260px auto 80px" : "auto auto auto"}
            >
                <GridItem style={gridItemStyle}>
                    <div className='flashcard-item'>
                        <Image
                            url={showChildren ? verticalTriangle : horizontalTriangle}
                            width='16px' height="16px"
                            onClick={toggleChildren}
                        />
                        <Paragraph text={name} style={{
                                margin: "0px",
                                lineHeight: "2",
                                textDecoration: view != "desktop" ? "underline" : "none",
                        }}
                        onClick={view != "desktop" ? studyCard : () => {}}
                        />
                    </div>
                </GridItem>

                <GridItem style={gridItemStyle}>
                    <div className='flashcard-item'>
                        <Heading5 text={cardsCount + " cards"} style={{
                            lineHeight: "2",
                            marginLeft: "0px",
                            marginRight: "16px",
                        }}/>
                    {view == "desktop" ? <ReviewBarChart studying={studyingCount} recapping={recappingCount} notStarted={notStartedCount} view={view}/> : <></>}
                    </div>
                </GridItem>

                <GridItem style={gridItemStyle}>
                    <div className='flashcard-item'>
                        {view == "desktop" ?
                            <Button text="Study" style={{
                                margin: "0px",
                                fontSize: "16px",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingLeft: "18px",
                                paddingRight: "18px",
                            }}
                            onClick={studyCard}
                            />
                        : <></>}
                        <Image url={threeDots} width='16px' height='16px' minWidth='16px' paddingRight='0px' paddingLeft='8px'/>
                    </div>
                </GridItem>
            </GridContainer>
            {view != "desktop" ?
            <ReviewBarChart studying={studyingCount} recapping={recappingCount} notStarted={notStartedCount} view={view}/>
            : <></>}
            <motion.div
                className='child-wrapper'
                style={{
                    display: showChildren ? 'block' : 'none',
                }}
                initial="hide"
                animate={showChildren ? "show" : "hide"}
                exit="exit"
                variants={easeIn}
            >
                {child}
            </motion.div>
        </div>
    );
}

export default FlashcardFolder;
