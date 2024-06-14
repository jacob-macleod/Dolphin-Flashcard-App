import {React, useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import NewFlashcardPopup from '../containers/Modal/NewFlashcardPopup/NewFlashcardPopup';
import Paragraph from '../componments/Text/Paragraph';
import FlashcardRow from '../containers/FlashcardRow';
import SearchBar from '../componments/SearchBar/SearchBar';
import Button from '../componments/Button/Button';
import BoldParagraph from '../componments/Text/BoldParagraph/BoldParagraph';
import apiManager from '../api/Api';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './EditFlashcard.css';
import '../containers/Modal/NewGoalPopup/NewGoalPopup.css';
import { getCookie } from '../api/Authentication';
import Heading5 from '../componments/Text/Heading5/Heading5';

function Flashcards() {
  // Set general variables
  const title = "Flashcards";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [moveFolderDialogueVisible, setMoveFolderDialogueVisible] = useState(false);
  const [reload, setReload] = useState(true);
  const [createCardDialogueVisible, setCreateCardDialogueVisible] = useState(false);
  const [sortType, setSortType] = useState("most-recent");
  const [flashcardData, setFlashcardData] = useState(null);
  const [flashcardsExist, setFlashcardsExist] = useState(null);
  const [flashcardItems, setFlashcardItems] = useState([]);
  const [NewFlashcardPopupVisible, setNewFlashcardPopupVisible] = useState(false);

  // Use useLocation hook to get the current location object
  const location = useLocation();
  // Create a new URLSearchParams object with the search part of the location
  const queryParams = new URLSearchParams(location.search);

  // Get the query parameters from the URL
  const newSet = queryParams.get('newSet');
  const flashcardName = queryParams.get('flashcardName');
  const folder = queryParams.get('folder');
  const description = queryParams.get('flashcardDescription');

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );
  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view == "mobile" ? "8px" : "16px"
  );

  function handleOptionChange(event) {
    setSortType(event.target.value);
  }  

  // Manage resizing the window size when needed
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
  
    // Set the initial window size
    setWidth(window.innerWidth);
  
    // Set up the event listener for resize
    window.addEventListener("resize", handleResize);

    // Request the flashcard set details if it is not a new set
    if (newSet === "true") {
      setFlashcardData(
        {
          "cards": [],
          "description": description,
          "name": flashcardName
        },
      )
      setFlashcardsExist(false);
    } else {
      apiManager.getFlashcard(
        getCookie("userID"),
        folder,
        flashcardName,
        setFlashcardData
      );
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*useEffect(() => {
    console.log(flashcardData);
    if (flashcardData != null && flashcardData.cards != null) {
      if (flashcardData.cards.length == 0) {
        setFlashcardsExist(false);
      } else {
        setFlashcardsExist(true);
      }
    }
  }, [flashcardData]);*/

  useEffect(() => {
    setView(
      width < mobileBreakpoint ? "mobile"
      : width < tabletBreakpoint ? "tablet" : "desktop");
    setFlashcardBoxHorizontalPadding(
      view == "mobile" ? "8px" : "16px"
    );
  }, [width]);

  // Get the flashcard data
  useEffect(() => {
    console.log(flashcardData)
    const fetchCardData = async () => {
      const cardPromises = flashcardData.cards.map((cardID) => {
        console.log("Getting card data");
        return new Promise((resolve) => {
          apiManager.getFlashcardItem(cardID, (item) => {
            resolve(item);
          });
        });
      });

      const cardData = await Promise.all(cardPromises);
      setFlashcardItems(cardData);
      setFlashcardsExist(true);
    };

    if (flashcardData != null && flashcardData.cards != null) {
      if (flashcardData.cards.length == 0) {
        setFlashcardsExist(false);
      } else {
        fetchCardData();
      }
    }
  }, [flashcardData]);

  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <NewFlashcardPopup
        visible={NewFlashcardPopupVisible}
        setVisible={setNewFlashcardPopupVisible}
        view={view}
        flashcardData={flashcardData}
        flashcardItems={flashcardItems}
        setFlashcardItems={setFlashcardItems}
        folder={folder}
      />

      <GridContainer layout={
        view != "mobile" ? "240px auto"
        : "auto"
      } classType="two-column-grid">
        {view != "mobile" ? <SidePanel selectedItem="flashcards"/> : <></>}

        <GridItem style={{
          paddingLeft: flashcardBoxHorizontalPadding,
          paddingRight: flashcardBoxHorizontalPadding,
          paddingTop: "0px",
          width: view == "mobile" ? "100vw" : "",
          display: view == "mobile" ? "block" : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards"/> : <></>}
  
          <WhiteOverlay
            style={{
                height: "max-content",
                padding: "16px",
                paddingBottom: view == "mobile" ? "80px" : "",
                width: view == "desktop" ? "100%" : "calc(100% - 16px)"
              }}
            >
              <div style={{maxWidth: "1200px", margin: "auto"}}>
                <div className='flashcard-set-header'>

                  <p
                    className='link'
                    style={{paddingLeft: "16px"}}
                    onClick={() => {window.open("/flashcards", "_self")}}
                  >

                    &lt; Back to {newSet === "true" ? "flashcards" : "studying"}
                  </p>

                  <Paragraph text={
                    folder == "" ? '"Your Account > ' + flashcardName  + '"': folder.replace(/\//g, ' > ') + ' > ' + flashcardName + '"'
                  } type="grey-italics" />
                  </div>

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
                      onClick={() => {alert("Searching")}}
                      style={{
                        marginTop: "8px",
                        marginBottom: "8px",
                        borderRadius: "0 8px 8px 0",
                        marginRight: "8px"
                      }}
                    />
                  </div>

                  <div className='sort-dialogue'>
                    <Paragraph text="Sort:" />
                    <select className="dropdown" value={sortType} onChange={handleOptionChange}>
                        <option value="a-z" className="option">A-Z</option>
                        <option value="z-a" className="option">Z-A</option>
                        <option value="most-recent" className="option">Most Recent</option>
                        <option value="least-recent" className="option">Least Recent</option>
                    </select>
                  </div>

                  <Button text="+ New Card" onClick={() => {
                    setNewFlashcardPopupVisible(true);
                  }} />

                  <div className='two-column-text'>
                      <BoldParagraph text="Term:" />
                      <BoldParagraph text="Definition:" />
                  </div>

                  {
                    flashcardsExist
                    ? flashcardItems.map((item) => (
                        <FlashcardRow front={item.front} back={item.back} />
                      ))
                    : <Heading5
                        text="You don't have any flashcards yet!"
                        style={{margin: "8px"}}
                      />
                  }
            </div>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Flashcards;
