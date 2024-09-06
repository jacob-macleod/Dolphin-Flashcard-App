import {React, useState} from 'react';
import CardOverview from '../CardOverview';
import Image from '../../componments/Image';
import ThreeDots from '../../static/three-dots.svg';
import FlashcardOperationsMenu from '../Modal/FlashcardOperationsMenu';
import DelayedElement from '../DelayedElement';
import "./FlashcardRow.css"

function FlashcardRow({ front, back, view, showEditPopup, setInitialTerm, setInitialDefinition, cardID, setReload}) {
    const [flashcardOperationsMenuVisible, setFlashcardOperationsMenuVisible] = useState(false);
    const [loadingIconVisible, setLoadingIconVisible] = useState(false);

    function handleClick() {
        setFlashcardOperationsMenuVisible(!flashcardOperationsMenuVisible);
    }

    return (
        <div className='flashcard-row'>
            <CardOverview text={front} turnOverCardOnSpaceKey={false} />
            <CardOverview text={back} turnOverCardOnSpaceKey={false} />
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
            />
            <div>
                <Image url={ThreeDots} width="16px" minWidth="16px" maxHeight="16px" onClick={handleClick}/>
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