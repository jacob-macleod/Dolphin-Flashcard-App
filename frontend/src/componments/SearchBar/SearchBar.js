import React from 'react';
import '../../containers/Modal/NewGoalPopup/NewGoalPopup.css';

function SearchBar({
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
    float
}) {
    return (
        <input
            className={view === "mobile" ? "input-mobile" : "input"}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
                marginBottom: "0px",
                float: "left",
                marginRight: marginRight,
                marginTop: marginTop,
                marginLeft: marginLeft,
                borderRadius: borderRadius,
                paddingBottom: paddingBottom,
                width: width,
                float: float
            }}
            type='text'
            placeholder={"Search..."}
        />
    );
}

export default SearchBar;