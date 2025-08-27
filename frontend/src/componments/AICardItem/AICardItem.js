import React from "react";
import GridContainer from "../GridContainer/GridContainer";
import WhiteOverlay from "../WhiteOverlay/WhiteOverlay";
import GridItem from "../GridItem/GridItem";
import threeDots from '../../static/three-dots.svg';
import Image from "../Image/Image";
import AICardOperationsPopup from "../../containers/Modal/AICardOperationsPopup/AICardOperationsPopup";

const cardText = "This is sample card text. Replace this with actual content. make it longer to see how it looks when the text is long. <br/><br/> This is a new paragraph to demonstrate line breaks.";
function AICardItem({frontText,backText,showDeleteConfirmation}) {

    const [operationsPopupVisible, setOperationsPopupVisible] = React.useState(false);

    function toggleOperationsPopup() {
        if (operationsPopupVisible) {
            setOperationsPopupVisible(false);
        } else {
            setOperationsPopupVisible(true);
        }
    }

    return (
        <GridContainer layout="5fr 5fr 1fr" classType="ai-flashcards-grid" style={{alignItems:'center',gap:"10px"}} >
        
        <GridItem >
            <WhiteOverlay style={{height:'fit-content', maxWidth:'100%'}}>
                <p className="flashcard-text" dangerouslySetInnerHTML={{ __html: frontText }} />
            </WhiteOverlay>
        </GridItem>

         <GridItem >
            <WhiteOverlay style={{height:'fit-content', maxWidth:'100%'}}>
                <p className="flashcard-text" dangerouslySetInnerHTML={{ __html: backText }} />
            </WhiteOverlay>
        </GridItem>
        <GridItem >
             <Image url={threeDots} width='16px' height='16px' minWidth='16px' paddingRight='0px' onClick={toggleOperationsPopup}/>
              <AICardOperationsPopup
                        visible={operationsPopupVisible}
                        setVisible={setOperationsPopupVisible} 
                        showDeleteConfirmation={showDeleteConfirmation}
                        // setRenameFlashcardSetPopupVisible={setRenameFlashcardSetPopupVisible}
                        // flashcardData={flashcardData}
                        // path={path}
                        // flashcardName={element.flashcardName}
                        // view={view}
                    />
        </GridItem>
                
        </GridContainer>
    )
}

export default AICardItem;