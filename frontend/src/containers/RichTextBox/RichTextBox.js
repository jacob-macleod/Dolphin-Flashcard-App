import {React, useState} from 'react';
import "./RichTextBox.css";

function RichTextBox({ text="" }) {
    const [flashcardData, setFlashcardData] = useState(text);
    return (
        <textarea
            className="rich-text-box"
            value={flashcardData}
            onChange={(e) => setFlashcardData(e.target.value)}
        />
    );
}

export default RichTextBox;