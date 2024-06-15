import React, { useEffect } from 'react';
import Heading5 from '../../../componments/Text/Heading5/Heading5';
import Paragraph from '../../../componments/Text/Paragraph/Paragraph';
import Button from '../../../componments/Button';
import Image from '../../../componments/Image/Image';
import GridContainer from '../../../componments/GridContainer/GridContainer';
import GridItem from '../../../componments/GridItem/GridItem';
import ReviewBarChart from '../../ReviewBarChart';
import CardOperationsPopup from '../../Modal/CardOperationsPopup/CardOperationsPopup';

import circledTick from '../../../static/circled-tick.svg';
import emptyCircle from '../../../static/empty-circle.svg';
import threeDots from '../../../static/three-dots.svg';

import '../FlashcardItem.css';

function FlashcardItem({ element, setMoveFolderDialogueVisible, flashcardData, path="", view }) {
    const title = element.flashcardName;
    const numOfCards = Object.keys(element.cards).length;

    // onSelectClick is run on component mount, and selected is set to false
    const [selected, setSelected] = React.useState(true);
    const [operationsPopupVisible, setOperationsPopupVisible] = React.useState(false);

    function onSelectClick() {
        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    function toggleOperationsPopup() {
        if (operationsPopupVisible) {
            setOperationsPopupVisible(false);
        } else {
            setOperationsPopupVisible(true);
        }
    }

    const gridItemStyle = {
        padding: "0px",
    }

    function studyCard() {
        window.open(
            "/view?flashcardName[]=" + element.flashcardName + "&folder[]=" + path,
            "_self"
        );
    }

    useEffect(() => {
        const closeDropdown = e => {
            let targetElement = e.target;
    
            // Traverse up the DOM tree until we find a matching tag name or reach the document body
            while (targetElement && targetElement.tagName !== 'IMG') {
                targetElement = targetElement.parentNode;
            }
    
            // If targetElement is null, it means we reached the document body without finding a BUTTON element
            if (!targetElement) {
                setOperationsPopupVisible(false);
            }
        };

        document.body.addEventListener('click', closeDropdown);

        return () => document.body.removeEventListener('click', closeDropdown);
    }, []);

    /*
    Calculate how many cards are:
    - not started (review status is 0.0)
    - studying (just started today - review status is 0.x)
    - recapping (review status is >0.x)
    */
   const cards = element.cards;
   var notStarted = 0;
   var studying = 0;
   var recapping = 0;
   for (let key in cards) {
    let reviewStatus = cards[key].reviewStatus;
    if (reviewStatus == 0.0) {
        notStarted++;
    } else if (reviewStatus < 1.0) {
        studying++;
    } else {
        recapping++;
    }
   }
    return (
        <div>
        <GridContainer
            classType="flashcard-overview"
            layout={view == "desktop" ? "260px auto 80px" : "auto auto auto"}
        >
            <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Image url={selected ? emptyCircle : circledTick} width="16px" height="16px" onClick={onSelectClick}/>
                    <Paragraph text={title} style={{
                        margin: "0px",
                        lineHeight: "2",
                        textDecoration: view == "desktop" ? "none" : "underline",
                    }}
                    onClick={view != "desktop" ? studyCard : () => {}}
                    />
                </div>
            </GridItem>

            <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Heading5 text={numOfCards + " cards"} style={{
                        lineHeight: "2",
                        marginLeft: "0px",
                        marginRight: "16px",
                    }}/>
                    {view == "desktop" ? <ReviewBarChart studying={studying} recapping={recapping} notStarted={notStarted}/> : <></>}
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
                        onClick={studyCard}/>
                    : <></>}
                    <Image url={threeDots} width='16px' height='16px' minWidth='16px' paddingRight='0px' paddingLeft='8px' onClick={toggleOperationsPopup}/>
                    <CardOperationsPopup
                        visible={operationsPopupVisible}
                        setVisible={setOperationsPopupVisible} 
                        showMovePopup={setMoveFolderDialogueVisible}
                        flashcardData={flashcardData}
                        path={path}
                        flashcardID={element.flashcardID}
                        view={view}
                    />
                </div>
            </GridItem>
        </GridContainer>
        {view != "desktop" ?
            <ReviewBarChart studying={studying} recapping={recapping} notStarted={notStarted} view={view}/>
        : <></>}
        </div>
    );
}

export default FlashcardItem;