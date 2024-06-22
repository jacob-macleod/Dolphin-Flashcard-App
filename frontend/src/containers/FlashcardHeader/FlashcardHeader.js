import React from 'react';
import Paragraph from '../../componments/Text/Paragraph';

const FlashcardHeader = ({ newSet, flashcardName, folder, type="editFlashcardHeader", flashcardID, numberStudying }) => {
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
            : window.open("/view?flashcardName[]=" + flashcardName + "&folder[]=" + folder + "&flashcardID[]=" + flashcardID, "_self")
          }}
        >
          &lt; Back to {newSet === "true" ? "flashcards" : "studying"}
        </p>
      : <></>
      }
      <Paragraph text={
        folder === "" || folder === null
          ? '"Your Account > ' + flashcardName + '"'
          : numberStudying === 1
            ? folder.replace(/\//g, ' > ') + ' > ' + flashcardName + '"'
            : "\"Studying " + numberStudying + " flashcards\""
      } type="grey-italics" />
      {
        type === "studyFlashcard" && numberStudying === 1
        ? <p
          className='link'
          style={{ paddingLeft: "16px" }}
          onClick={() => { window.open("/edit-flashcard-set?flashcardName=" + flashcardName + "&folder=" + folder + "&flashcardID=" + flashcardID, "_self") }}
        >
          Edit Set
        </p>
        : <></>
      }
    </div>
  );
};

export default FlashcardHeader;
