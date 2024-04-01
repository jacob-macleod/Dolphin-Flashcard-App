import {React, useState} from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import Heading5 from './Heading5';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import ReviewBarChart from './ReviewBarChart';
import Button from './Button';

import horizontalTriangle from '../static/horizontal-triangle.svg';
import verticalTriangle from '../static/vertical-triangle.svg';

import './FlashcardFolder.css';
import './FlashcardItem.css';

function FlashcardFolder({ element, name, child, folderKey }) {
    const gridItemStyle = {
        padding: "0px",
    }

    // toggleChildren is run on component mount, and showChildren is set to false
    const [showChildren, setShowChildren] = useState(false);
    function toggleChildren() {
        if (showChildren) {
            setShowChildren(false);
        } else {
            setShowChildren(true);
        }
    }

    return (
        <div key={folderKey} className='folder-wrapper'>
            <GridContainer classType="flashcard-overview" layout="260px auto 56px">
                <GridItem style={gridItemStyle}>
                    <div className='flashcard-item'>
                        <Image
                            url={showChildren ? verticalTriangle : horizontalTriangle}
                            width='16px' height="16px"
                            onClick={toggleChildren}
                        />
                        <Paragraph text={name} style={{
                                margin: "0px",
                                lineHeight: "2"
                        }}/>
                    </div>
                </GridItem>

                <GridItem style={gridItemStyle}>
                <div className='flashcard-item'>
                    <Heading5 text={"x cards"} style={{
                        lineHeight: "2",
                        marginLeft: "0px",
                        marginRight: "16px",
                    }}/>
                    <ReviewBarChart studying={1} recapping={1} notStarted={1}/>
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
            <div className='child-wrapper' style={{
                display: showChildren ? 'block' : 'none',
            }}>
                {child}
            </div>
        </div>
    );
}

export default FlashcardFolder;