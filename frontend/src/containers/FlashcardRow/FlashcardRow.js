import {React, useState} from 'react';
import CardOverview from '../CardOverview';
import Image from '../../componments/Image';
import ThreeDots from '../../static/three-dots.svg';
import FlashcardOperationsMenu from '../Modal/FlashcardOperationsMenu';
import DelayedElement from '../DelayedElement';
import "./FlashcardRow.css"

function FlashcardRow({ front, back, view, showEditPopup, setInitialTerm, setInitialDefinition, cardID, flashcardID, setReload, isInEditPage, turnable}) {
    const [flashcardOperationsMenuVisible, setFlashcardOperationsMenuVisible] = useState(false);
    const [loadingIconVisible, setLoadingIconVisible] = useState(false);

    function handleClick() {
        setFlashcardOperationsMenuVisible(!flashcardOperationsMenuVisible);
    }

    return (
        <div className={view === 'mobile' ? 'flashcard-row-mobile' : 'flashcard-row'}>
            <CardOverview text={front} turnOverCardOnSpaceKey={false} isInEditPage={isInEditPage} showTurnOverButton={false} turnable={false}/>
            <CardOverview text={back} turnOverCardOnSpaceKey={false} isInEditPage={isInEditPage} showTurnOverButton={false} turnable={false}/>
            <FlashcardOperationsMenu
                view={view}
                showEditPopup={showEditPopup}
                visible={flashcardOperationsMenuVisible}
                setVisible={setFlashcardOperationsMenuVisible}
                setInitialTerm={setInitialTerm}
                setInitialDefinition={setInitialDefinition}
                cardID={cardID}
                front={front}
                back={back}
                setLoadingIconVisible={setLoadingIconVisible}
                setReload={setReload}
                flashcardID={flashcardID}
            />
            <div className="three-dots-container" onClick={handleClick}>
                <Image url={ThreeDots} width={view === 'mobile' ? "32px" : "16px"} minWidth={view === 'mobile' ? "32px" : "16px"} maxHeight={view === 'mobile' ? "32px" : "16px"} paddingRight='0px' cursor="pointer"/>
            </div>
            <div></div>
            <div></div>
            <div style={{float: "right"}}>
                <DelayedElement child={<></>} childValue={loadingIconVisible} />
            </div>
        </div>
    );
}

export default FlashcardRow;