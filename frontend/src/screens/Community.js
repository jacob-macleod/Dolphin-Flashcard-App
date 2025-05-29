import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import Heading4 from '../componments/Text/Heading4';
import Heading5 from '../componments/Text/Heading5';
import SearchBar from '../componments/SearchBar/SearchBar';
import Button from '../componments/Button';
import FlashcardSearchResult from '../containers/FlashcardSearchResult';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import SidePanel from '../containers/SidePanel/SidePanel';

import apiManager from '../api/Api';

import './Community.css';
import { transform } from 'framer-motion';

function SearchForFlashcard() {
  // Set general variables
  const title = "Search";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view === "mobile" ? "8px" : "16px"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [flashcardSearchData, setFlashcardSearchData] = useState(null);
  const [flashcardsExist, setFlashcardsExist] = useState(true);

  function searchForFlashcard() {
    if (searchTerm !== "") {
      apiManager.searchForFlashcard(searchTerm, setFlashcardSearchData);
    }
  }


  useEffect(() => {
    if (flashcardSearchData != null && flashcardSearchData.length == 0) {
      setFlashcardsExist(false);
    } else {
      setFlashcardsExist(true);
    }
  }, [flashcardSearchData]);

  // Reset the search term data when the user searches for something else
  useEffect(() => {
    setFlashcardsExist(true);
  }, [searchTerm]);

  useEffect(() => {
    setFlashcardBoxHorizontalPadding(view === "mobile" ? "8px" : "16px");
  }, [view]);

  return (
    <div style={{ top: "0px" }}>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
        {view !== "mobile" ? <SidePanel selectedItem="community" /> : <></>}

        <GridItem
          style={{
            paddingLeft: view !== "mobile" ? flashcardBoxHorizontalPadding : "",
            paddingRight: view !== "mobile" ? flashcardBoxHorizontalPadding : "",
            paddingBottom: view === "mobile" ? "0px" : "32px",
            paddingTop: "0px",
            width: view === "mobile" ? "100vw" : "",
            display: view === "mobile" ? "block" : "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >

          <MobilePageWrapper view={view} itemClicked="community">

            <div className={view === "mobile" ? "community-page-wrapper-mobile" : "community-page-wrapper"}>
              <div>
                <Heading4 text="Find flashcards created by fellow learners" />
                <div className={view !== "mobile" ? "search-bar" : "search-bar-mobile"}>
                  <SearchBar
                    view={view}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search..."
                    marginTop={view === "mobile" ? "8px" : "0px"}
                    marginRight="0px"
                    borderRadius="8px 0 0 8px"
                    paddingBottom={view=== "mobile" ? "8px" : "10px"}
                    width={view === "mobile"? "calc(100% - 26px)" : "auto"}
                    />
                  <Button
                    text="Search"
                    onClick={() => {searchForFlashcard()}}
                    style={{
                      margin: "0px",
                      width: "min-content",
                      borderRadius: "0px 8px 8px 0px",
                      height: "42px",
                      marginTop: view === "mobile" ? "8px" : "0px",
                    }}
                  />
                </div>
                {
                  flashcardSearchData != null ?
                    flashcardsExist ?
                      flashcardSearchData.map((flashcard, index) => {
                        return <FlashcardSearchResult key={index} data={flashcard} />
                      })
                    :
                      <Heading5 text={"No flashcards found for '" + searchTerm + "'"} />
                  : <></>
                }
              </div>
            </div>
          </MobilePageWrapper>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default SearchForFlashcard;
