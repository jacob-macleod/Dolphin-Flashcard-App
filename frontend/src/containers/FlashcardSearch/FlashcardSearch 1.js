import React from 'react';
import SearchBar from '../../componments/SearchBar/SearchBar';
import Button from '../../componments/Button/Button';

const FlashcardSearch = ({ view }) => {
  return (
    <div className="search-bar">
      <SearchBar
        searchTerm={""}
        setSearchTerm={console.log}
        view={view}
        marginRight="0px"
        borderRadius="8px 0 0 8px"
        paddingBottom="8px"
        placeholder="Search..."
        width="100%"
      />
      <Button
        text="Search"
        onClick={() => { alert("Searching") }}
        style={{
          marginTop: "8px",
          marginBottom: "8px",
          borderRadius: "0 8px 8px 0",
          marginRight: "8px"
        }}
      />
    </div>
  );
};

export default FlashcardSearch;
