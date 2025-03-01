import React, { useEffect, useState } from 'react';
import SearchBar from '../../componments/SearchBar/SearchBar';
import Button from '../../componments/Button/Button';

const FlashcardSearch = ({ view, currentValue="", handleSearchClick}) => {
  const [updateSearchValue, setUpdateSearchValue] = useState("")

  useEffect(() => {
    setUpdateSearchValue(currentValue)
  }, [currentValue])

  return (
    <div className="search-bar">
      <SearchBar
        searchTerm={updateSearchValue}
        setSearchTerm={setUpdateSearchValue}
        onKeyDown={event => event.key === 'Enter' && handleSearchClick(updateSearchValue)}
        view={view}
        marginTop="8px"
        marginRight="0px"
        borderRadius="8px 0 0 8px"
        paddingBottom="8px"
        placeholder="Search..."
        width={view === "mobile"? "calc(100% - 26px)" : "calc(100% - 42px)"}
      />
      <Button
        text="Search"
        onClick={() => handleSearchClick(updateSearchValue)}
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
