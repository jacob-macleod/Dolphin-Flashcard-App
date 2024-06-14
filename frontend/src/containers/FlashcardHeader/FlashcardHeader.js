import React from 'react';
import Paragraph from '../../componments/Text/Paragraph';

const FlashcardHeader = ({ newSet, flashcardName, folder, type="editFlashcardHeader" }) => {
  return (
    <div className='flashcard-set-header'>
      {
        type === "editFlashcardHeader"
        ? <p
          className='link'
          style={{ paddingLeft: "16px" }}
          onClick={() => {
            newSet === "true"
            ? window.open("/flashcards", "_self")
            : window.open("/study?flashcardName=" + flashcardName + "&folder=" + folder, "_self")
          }}
        >
          &lt; Back to {newSet === "true" ? "flashcards" : "studying"}
        </p>
      : <></>
      }
      <Paragraph text={
        folder === "" || folder === null
          ? '"Your Account > ' + flashcardName + '"'
          : folder.replace(/\//g, ' > ') + ' > ' + flashcardName + '"'
      } type="grey-italics" />
      {
        type === "studyFlashcard"
        ? <p
          className='link'
          style={{ paddingLeft: "16px" }}
          onClick={() => { window.open("/edit-flashcard-set?flashcardName=" + flashcardName + "&folder=" + folder, "_self") }}
        >
          Edit Set
        </p>
        : <></>
      }
    </div>
  );
};

export default FlashcardHeader;
