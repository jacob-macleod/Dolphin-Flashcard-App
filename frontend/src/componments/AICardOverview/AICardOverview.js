import React from "react";
import Grid from "react-loading-icons/dist/esm/components/grid";
import GridContainer from "../GridContainer/GridContainer";
import Heading5 from "../Text/Heading5";
import AICardItem from "../AICardItem/AICardItem";

// Example array of any number of flashcards


function AICardOverview({cardData, showDeleteFlashcardConfirmation,}) {
  console.log(cardData)
  if (!Array.isArray(cardData) || cardData.length === 0) {
    return <Heading5 text="Generated flashcards appear here!" />;
  }

    return (  
      cardData.map(card => (
        <AICardItem
          key={card.cardID}
          frontText={card.front}
          backText={card.back}
          showDeleteConfirmation={showDeleteFlashcardConfirmation}
        />
      ))
  );



}

export default AICardOverview;