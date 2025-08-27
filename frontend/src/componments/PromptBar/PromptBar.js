import React from 'react';
import '../../containers/Modal/NewGoalPopup/NewGoalPopup.css';

function PromptBar({
    searchTerm,
    setSearchTerm,
    onKeyDown=()=>{},
    view,
    marginRight,
    marginTop,
    marginLeft,
    borderRadius,
    paddingBottom,
    placeholder,
    width,
    float,
    height,
}) {
    return (
        <textarea
            className={view == "mobile" ? "input-mobile" : "input"}
            value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
            defaultValue="“Generate a flashcard set with 20 cards explaining the properties of waves for A-Level AQA Physics”"
            style={{
                marginBottom: "0px",
                float: "left",
                marginRight: marginRight,
                marginTop: marginTop,
                marginLeft: marginLeft,
                borderRadius: borderRadius,
                paddingBottom: paddingBottom,
                width: width,
                float: float,
                height: height,
                resize: "none",
            }}
            type='text'
            placeholder={placeholder}
        />
    );
}

export default PromptBar;