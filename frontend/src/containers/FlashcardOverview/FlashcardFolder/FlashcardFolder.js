import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import Image from '../../../componments/Image/Image';
import Paragraph from '../../../componments/Text/Paragraph/Paragraph';
import Heading5 from '../../../componments/Text/Heading5/Heading5';
import GridContainer from '../../../componments/GridContainer/GridContainer';
import GridItem from '../../../componments/GridItem/GridItem';
import ReviewBarChart from '../../ReviewBarChart';
import Button from '../../../componments/Button';
import FolderOperationsPopup from '../../Modal/FolderOperationsPopup';
import { easeIn } from '../../../animations/animations';

import horizontalTriangle from '../../../static/horizontal-triangle.svg';
import verticalTriangle from '../../../static/vertical-triangle.svg';
import threeDots from '../../../static/three-dots.svg'

import '../FlashcardFolder.css';
import '../FlashcardItem.css';

function FlashcardFolder({
    element,
    name,
    child,
    folderKey,
    setMoveFolderDialogueVisible,
    showDeleteConfirmation,
    setRenameFolderPopupVisible,
    flashcardData,
    view,
    path
}) {
    const gridItemStyle = {
        padding: "0px",
    }

    const [showChildren, setShowChildren] = useState(false);
    const [cardsCount, setCardsCount] = useState(0);
    const [studyingCount, setStudyingCount] = useState(0);
    const [recappingCount, setRecappingCount] = useState(0);
    const [notStartedCount, setNotStartedCount] = useState(0);
    const [flashcardIDList, setFlashcardIDs] = useState([]);
    const [flashcardFolderList, setFlashcardFolders] = useState([]);
    const [flashcardNameList, setFlashcardNameList] = useState([]);
    const [operationsPopupVisible, setOperationsPopupVisible] = React.useState(false);

    function toggleChildren() {
        setShowChildren(!showChildren);
    }

    function toggleOperationsPopup() {
        if (operationsPopupVisible) {
            setOperationsPopupVisible(false);
        } else {
            setOperationsPopupVisible(true);
        }
    }

    function studyCard() {
        let flashcardIDData = "";
        let folderData = "";
        let flashcardNameData = "";
        // Iterate through all the flashcards and form the url data. This assumes flashcardIDList
        // and flashcardFolderList have the same length with the item at x index of one corrosponding to
        // the item at x index of the other, which should be true
        for (let i = 0; i < flashcardIDList.length; i++) {
            // The first data item should have ?, not & at the start
            if (flashcardIDData === "") {
                flashcardIDData += "?flashcardID[]=" + flashcardIDList[i];
            } else {
                flashcardIDData += "&flashcardID[]=" + flashcardIDList[i];
            }
            folderData += "&folder[]=" + flashcardFolderList[i];
            flashcardNameData += "&flashcardName[]=" + flashcardNameList[i];
        };

        // Open the actual URL
        window.open(
            "/view" + flashcardIDData + folderData + flashcardNameData,
            "_self"
        );
    }

    function countCards(data, folder=path) {
        let cards = 0;
        let studying = 0;
        let recapping = 0;
        let notStarted = 0;
        let flashcardIDs = []; // The IDs of each flashcard in the folder
        let flashcardFolders = []; // The absolute folder path of each flashcard in the folder
        let flashcardNames = []; // The name of each flashcard
        let itemNumber = 0; // The item of data being examined

        Object.values(data).forEach(item => {
            if (item.cards) {
                cards += Object.keys(item.cards).length;
                flashcardIDs.push(item.flashcardID);
                flashcardFolders.push(folder);
                flashcardNames.push(item.flashcardName);

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
                let newFolder = folder;
                if (Object.keys(data)[itemNumber] !== "") {
                    newFolder += "/" + Object.keys(data)[itemNumber]
                }

                const {
                    cards: subCards,
                    studying: subStudying,
                    recapping: subRecapping,
                    notStarted: subNotStarted,
                    flashcardIDs: subFlashcardIDs,
                    flashcardFolders: subFlashcardFolders,
                    flashcardNames: subFlashcardNames
                } = countCards(item, folder=newFolder);
                cards += subCards;
                studying += subStudying;
                recapping += subRecapping;
                notStarted += subNotStarted;

                // Assumes subFlashcardIDs, subFlashcardFolders and subFlashcardNames have same length,
                // Which should be the case
                for (let i = 0; i < subFlashcardIDs.length; i++) {
                    flashcardIDs.push(subFlashcardIDs[i]);
                    flashcardFolders.push(subFlashcardFolders[i]);
                    flashcardNames.push(subFlashcardNames[i]);
                }
            }
            itemNumber ++;
        });

        return { cards, studying, recapping, notStarted, flashcardIDs, flashcardFolders, flashcardNames };
    }

    useEffect(() => {
        const { cards, studying, recapping, notStarted, flashcardIDs, flashcardFolders, flashcardNames } = countCards(element);
        setCardsCount(cards);
        setStudyingCount(studying);
        setRecappingCount(recapping);
        setNotStartedCount(notStarted);
        setFlashcardIDs(flashcardIDs);
        setFlashcardFolders(flashcardFolders);
        setFlashcardNameList(flashcardNames);
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
                        <Image url={threeDots} width='16px' height='16px' minWidth='16px' paddingRight='0px' paddingLeft='8px' onClick={toggleOperationsPopup}/>
                        <FolderOperationsPopup
                        visible={operationsPopupVisible}
                        setVisible={setOperationsPopupVisible} 
                        showDeleteConfirmation={showDeleteConfirmation}
                        setRenameFolderPopupVisible={setRenameFolderPopupVisible}
                        flashcardData={flashcardData}
                        path={path}
                        flashcardName={name}
                        view={view}
                    />
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
