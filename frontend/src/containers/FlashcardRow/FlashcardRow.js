import {React, useState} from 'react';
import CardOverview from '../CardOverview';
import Image from '../../componments/Image';
import ThreeDots from '../../static/three-dots.svg';
import FlashcardOperationsMenu from '../Modal/FlashcardOperationsMenu';
import "./FlashcardRow.css"

function FlashcardRow({ front, back, view, showEditPopup, setInitialTerm, setInitialDefinition}) {
    const [flashcardOperationsMenuVisible, setFlashcardOperationsMenuVisible] = useState(false);

    function handleClick() {
        setFlashcardOperationsMenuVisible(!flashcardOperationsMenuVisible);
    }

    return (
        <div className='flashcard-row'>
            <CardOverview text={front} />
            <CardOverview text={back} />
            <FlashcardOperationsMenu
                view={view}
                showEditPopup={showEditPopup}
                visible={flashcardOperationsMenuVisible}
                setVisible={setFlashcardOperationsMenuVisible}
                setInitialTerm={setInitialTerm}
                setInitialDefinition={setInitialDefinition}
                front={front}
                back={back}
            />
            <div>
                <Image url={ThreeDots} width="16px" minWidth="16px" maxHeight="16px" onClick={handleClick}/>
            </div>
        </div>
    );
}

export default FlashcardRow;