import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import Heading4 from '../componments/Text/Heading4';
import Paragraph from '../componments/Text/Paragraph';
import SearchBar from '../componments/SearchBar/SearchBar';
import Button from '../componments/Button';

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

  function searchForFlashcard() {
    alert ("Searching for " + searchTerm);
  }

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
        {view !== "mobile" ? <SidePanel selectedItem="community"/> : <></>}

        <GridItem
          style={{
            paddingLeft: flashcardBoxHorizontalPadding,
            paddingRight: flashcardBoxHorizontalPadding,
            paddingTop: "0px",
            width: view === "mobile" ? "100vw" : "",
            display: view === "mobile" ? "block" : "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {view === "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="community" /> : <></>}

          <WhiteOverlay
            style={{
              height: "100%",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <Heading4 text="Find flashcards created by fellow learners" />
              <SearchBar
                view={view}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
              <Button text="Search" onClick={() => {searchForFlashcard()}}/>
            </div>
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default SearchForFlashcard;
