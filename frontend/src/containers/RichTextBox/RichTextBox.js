import {React, useState} from 'react';
import { SketchPicker } from 'react-color';
import BoldParagraph from '../../componments/Text/BoldParagraph/BoldParagraph';
import Image from '../../componments/Image/Image';
import Button from '../../componments/Button/Button';
import GhostButton from '../../componments/GhostButton';
import UnnumberedListIcon from '../../static/unnumbered-list-icon.svg';
import NumberedListIcon from '../../static/numbered-list-icon.svg';
import "./RichTextBox.css";

function RichTextBox({ flashcardData, setFlashcardData, type }) {
    const [activeButtons, setActiveButtons] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        unnumberedList: false,
        numberedList: false,
        color: false,
    });
    const [cursorPosition, setCursorPosition] = useState(0);
    const [numberedListNumber, setNumberedListNumber] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const iconStyle = {
        margin: "0px",
        width: "32px",
        height: "32px",
        fontSize: "18px",
        marginLeft: "6px",
        marginRight: "6px"
    };

    const boldButtonStyle = {
        ...iconStyle,
        fontWeight: "900",
    };

    const italicsButtonStyle = {
        ...iconStyle,
        fontStyle: "italic",
        fontWeight: "400",
        fontFamily: "Roboto Serif",
    };

    const underlineButtonStyle = {
        ...iconStyle,
        textDecoration: "underline",
    };

    const strikethroughButtonStyle = {
        ...iconStyle,
        textDecoration: "line-through",
    };

    const colorPickerIconStyle = {
        ...iconStyle,
        backgroundColor: selectedColor,
        border: "none"
    }

    const handleButtonClick = (buttonType) => {
        if (buttonType === 'bold') {
            insertTextAtCursor("**");
        } else if (buttonType === 'italic') {
            insertTextAtCursor("*");
        } else if (buttonType === 'underline') {
            if (activeButtons.underline) {
                insertTextAtCursor("</u>");
            } else {
                insertTextAtCursor("<u>");
            }
        } else if (buttonType === 'strikethrough') {
            insertTextAtCursor("~~");
        } else if (buttonType === 'unnumberedList') {
            insertTextAtCursor("<br>\n- ");
        } else if (buttonType === 'numberedList') {
            insertTextAtCursor("<br>\n" + numberedListNumber + ". ");
            setNumberedListNumber(numberedListNumber + 1);
        } else if (buttonType === 'color') {
            insertTextAtCursor(`<span style="color:${selectedColor}"></span>`);
        }

        setActiveButtons((prevState) => ({
            ...prevState,
            [buttonType]: !prevState[buttonType],
        }));
    };

    const insertTextAtCursor = (text) => {
        const textarea = document.querySelector(".rich-text-box");
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = flashcardData.slice(0, start) + text + flashcardData.slice(end);
        setFlashcardData(newText);
        setCursorPosition(start + text.length);
    };

    const handleTextareaChange = (e) => {
        setFlashcardData(e.target.value);
    };

    const handleTextareaClick = (e) => {
        setCursorPosition(e.target.selectionStart);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <div>
            <BoldParagraph text={type} />
            <div className='text-effects'>
                {activeButtons.bold ? (
                    <Button
                        style={boldButtonStyle}
                        text="B"
                        onClick={() => handleButtonClick('bold')}
                    />
                ) : (
                    <GhostButton
                        style={boldButtonStyle}
                        text="B"
                        onClick={() => handleButtonClick('bold')}
                    />
                )}
                {activeButtons.italic ? (
                    <Button
                        style={italicsButtonStyle}
                        text="I"
                        onClick={() => handleButtonClick('italic')}
                    />
                ) : (
                    <GhostButton
                        style={italicsButtonStyle}
                        text="I"
                        onClick={() => handleButtonClick('italic')}
                    />
                )}
                {activeButtons.underline ? (
                    <Button
                        style={underlineButtonStyle}
                        text="U"
                        onClick={() => handleButtonClick('underline')}
                    />
                ) : (
                    <GhostButton
                        style={underlineButtonStyle}
                        text="U"
                        onClick={() => handleButtonClick('underline')}
                    />
                )}
                {activeButtons.strikethrough ? (
                    <Button style={strikethroughButtonStyle}
                        text="S"
                        onClick={() => handleButtonClick('strikethrough')}
                    />
                ) : (
                    <GhostButton style={strikethroughButtonStyle} text={"S"} onClick={() => handleButtonClick('strikethrough')} />
                )}

                <div className='text-effects'>
                    <GhostButton
                        style={colorPickerIconStyle}
                        text=""
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    />
                    <p className='selected-color-style'>{selectedColor}</p>
                    {showColorPicker && (
                        <div style={{ position: 'absolute', zIndex: 2 }}>
                            <SketchPicker color={selectedColor} onChange={handleColorChange} />
                            <div className="text-effects">
                                <GhostButton
                                    text="Cancel"
                                    onClick={() => setShowColorPicker(false)}
                                />
                                <Button
                                    text="Apply"
                                    onClick={() => {
                                        setShowColorPicker(false);
                                        handleButtonClick('color');
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <GhostButton style={iconStyle} text={
                    <Image url={UnnumberedListIcon} width='16px' minWidth='16px' height='16px' paddingRight='0px'/>
                } onClick={() => handleButtonClick("unnumberedList")}/>
                <GhostButton style={iconStyle} text={
                    <Image url={NumberedListIcon} width='16px' minWidth='16px' height='16px' paddingRight='0px'/>
                } onClick={() => handleButtonClick("numberedList")}/>

            </div>
            <textarea
                className="rich-text-box"
                value={flashcardData}
                onChange={handleTextareaChange}
                onClick={handleTextareaClick}
                placeholder='Type here...'
            />
        </div>
    );
}

export default RichTextBox;
