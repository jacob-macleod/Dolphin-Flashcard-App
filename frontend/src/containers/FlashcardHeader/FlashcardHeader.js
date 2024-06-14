import React from 'react';
import Paragraph from '../../componments/Text/Paragraph';

const FlashcardHeader = ({ newSet, flashcardName, folder }) => {
  return (
    <div className='flashcard-set-header'>
      <p
        className='link'
        style={{ paddingLeft: "16px" }}
        onClick={() => { window.open("/flashcards", "_self") }}
      >
        &lt; Back to {newSet === "true" ? "flashcards" : "studying"}
      </p>
      <Paragraph text={
        folder === "" || folder === null
          ? '"Your Account > ' + flashcardName + '"'
          : folder.replace(/\//g, ' > ') + ' > ' + flashcardName + '"'
      } type="grey-italics" />
    </div>
  );
};

export default FlashcardHeader;
