import React from 'react';
import '../containers/NewGoalPopup.css';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input
            className='input'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            defaultValue="Search"
            style={{marginBottom: "0px", float: "left", marginLeft: "16px"}}
            type='text'
        />
    );
}

export default SearchBar;