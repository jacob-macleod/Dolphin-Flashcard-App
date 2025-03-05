import React from 'react';
import '../../containers/Modal/NewGoalPopup/NewGoalPopup.css';

function SearchBar({
    searchTerm,
    setSearchTerm,
    view,
    marginRight,
    marginTop,
    borderRadius,
    paddingBottom,
    placeholder,
    width,
    float
}) {
    return (
        <input
            className={view == "mobile" ? "input-mobile" : "input"}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            defaultValue="Search"
            style={{
                marginBottom: "0px",
                float: "left",
                marginLeft: view === "mobile" ? "0px" : "16px",
                marginRight: marginRight,
                marginTop: marginTop,
                borderRadius: borderRadius,
                paddingBottom: paddingBottom,
                width: width,
                float: float
            }}
            type='text'
            placeholder={placeholder}
        />
    );
}

export default SearchBar;