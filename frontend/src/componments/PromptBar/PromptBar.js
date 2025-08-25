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
        <input
            className={view == "mobile" ? "input-mobile" : "input"}
            value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
            defaultValue="Enter prompt..."
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
            }}
            type='text'
            placeholder={placeholder}
        />
    );
}

export default PromptBar;