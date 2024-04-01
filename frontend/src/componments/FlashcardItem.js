import React from 'react';
import Heading5 from './Heading5';
import Paragraph from './Paragraph';
import Button from './Button';
import Image from './Image';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import ReviewBarChart from './ReviewBarChart';

import circledTick from '../static/circled-tick.svg';
import emptyCircle from '../static/empty-circle.svg';

import './FlashcardItem.css';

function FlashcardItem({ element }) {
    const title = element.flashcardName;
    const numOfCards = Object.keys(element.cards).length;

    // onSelectClick is run on component mount, and selected is set to false
    const [selected, setSelected] = React.useState(true);

    function onSelectClick() {
        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    const gridItemStyle = {
        padding: "0px",
    }
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
        <GridContainer classType="flashcard-overview" layout="260px auto 56px">
            <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Image url={selected ? emptyCircle : circledTick} width="16px" height="16px" onClick={onSelectClick}/>
                    <Paragraph text={title} style={{
                        margin: "0px",
                        lineHeight: "2"
                    }}/>
                </div>
            </GridItem>

            <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Heading5 text={numOfCards + " cards"} style={{
                        lineHeight: "2",
                        marginLeft: "0px",
                        marginRight: "16px",
                    }}/>
                    <ReviewBarChart studying={studying} recapping={recapping} notStarted={notStarted}/>
                </div>
            </GridItem>

            <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Button text="Study" style={{
                        margin: "0px",
                        fontSize: "16px",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        paddingLeft: "18px",
                        paddingRight: "18px",
                    }}/>
                </div>
            </GridItem>
        </GridContainer>
    );
}

export default FlashcardItem;