import React from "react";
import GridContainer from "../GridContainer/GridContainer";
import WhiteOverlay from "../WhiteOverlay/WhiteOverlay";
import GridItem from "../GridItem/GridItem";
import ThreeDots from '../../static/three-dots.svg';
import Image from "../Image/Image";
import AICardOperationsPopup from "../../containers/Modal/AICardOperationsPopup/AICardOperationsPopup";
import CardOverview from "../../containers/CardOverview";
import { useState } from "react";
import FlashcardOperationsMenu from "../../containers/Modal/FlashcardOperationsMenu";
import DelayedElement from "../../containers/DelayedElement";

const cardText = "This is sample card text. Replace this with actual content. make it longer to see how it looks when the text is long. <br/><br/> This is a new paragraph to demonstrate line breaks.";
function AICardRow({ front, back, view, showEditPopup, setInitialTerm, setInitialDefinition, cardID, flashcardID, setReload, isInEditPage, isInAIPage, setAIFlashcardData,showDeleteFlashcardConfirmation}) {

    const [flashcardOperationsMenuVisible, setFlashcardOperationsMenuVisible] = useState(false);
    const [loadingIconVisible, setLoadingIconVisible] = useState(false);

    function handleClick() {
        setFlashcardOperationsMenuVisible(!flashcardOperationsMenuVisible)
    }

    return (
        <div className='flashcard-row'>
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
                isInAIPage={isInAIPage}
                setAIFlashcardData={setAIFlashcardData}

            />
            <div>
                <Image url={ThreeDots} width="16px" minWidth="16px" maxHeight="16px" style={{marginLeft:'20px'}} onClick={handleClick}/>
            </div>
            <div></div>
            <div></div>
            <div style={{float: "right"}}>
                <DelayedElement child={<></>} childValue={loadingIconVisible} />
            </div>
        </div>
    );
}

export default AICardRow;