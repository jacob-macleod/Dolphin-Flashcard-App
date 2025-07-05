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
import Heading5 from '../componments/Text/Heading5';
import Heading2 from '../componments/Text/Heading2';
import SearchBar from '../componments/SearchBar/SearchBar';
import Button from '../componments/Button';
import FlashcardSearchResult from '../containers/FlashcardSearchResult';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import DolphinLogo from '../componments/Logos/DolphinLogo/DolphinLogo';
import FeaturedCommunitySet from '../containers/FeaturedCommunitySet/FeaturedCommunitySet';

import apiManager from '../api/Api';
import communitySets from '../classes/CommunitySets';

import './Community.css';
import '../componments/Text/Link/Link.css';


function CommunityCategory() {
  // Set general variables
  // Get name of flashcard category from URL
  const url = window.location.href;
  let flashcardCategory = url.split("/").pop().replace(/-/g, " ");
  flashcardCategory = flashcardCategory.charAt(0).toUpperCase() + flashcardCategory.slice(1);
  const title = flashcardCategory;
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
              <WhiteOverlay
                className="search-section"
              >
                <div className='search-section-header-section'>
                  <DolphinLogo
                    width="160px"
                    minWidth="160px"
                    height="170px"
                    paddingBottom="30px"
                    paddingLeft="30px"
                    paddingRight="30px"
                    paddingTop="30px"
                  />
                  <div className="search-section-text">
                    <Heading2 text="Browse for flashcards for your subjects" />
                    <Heading2 text="More sets coming soon!" color="grey"/>
                  </div>
                </div>

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
                      width: "114px",
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
            </WhiteOverlay>

            <div>
              <p
                className='link'
                onClick={() => {window.open("/community", "_self")}}
                style={{textAlign: "left"}}
              >{'< All Categories'}</p>
              <Heading2 text={flashcardCategory + " Flashcard Sets:"} style={{textAlign: "left"}}/>
              <div class="flashcard-recommendation-container">
                {communitySets[flashcardCategory] && communitySets[flashcardCategory]["gcseSets"].map((set, index) => (
                  <FeaturedCommunitySet key={index} title={set.title} url={set.url} />
                ))
                }
              </div>
            </div>
            </div>
          </MobilePageWrapper>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default CommunityCategory;
