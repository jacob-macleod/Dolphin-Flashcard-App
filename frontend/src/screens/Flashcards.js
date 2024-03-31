import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import SidePanel from '../containers/SidePanel';
import Heading4 from '../componments/Heading4';
import WhiteOverlay from '../componments/WhiteOverlay';
import HamburgerBar from '../componments/HamburgerBar';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Flashcards() {
  // Set general variables
  const title = "Flashcards";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 700;
  const tabletBreakpoint = 1000;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );
  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view == "mobile" ? "0px" : "16px"
  );

  // Manage resizing the window size when needed
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
  
    // Set the initial window size
    setWidth(window.innerWidth);
  
    // Set up the event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setView(
      width < mobileBreakpoint ? "mobile"
      : width < tabletBreakpoint ? "tablet" : "desktop");
    setFlashcardBoxHorizontalPadding(
      view == "mobile" ? "0px" : "16px"
    );
  }, [width]);

  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout={
        view != "mobile" ? "240px auto"
        : "auto"
      } classType="two-column-grid">
        {view != "mobile" ? <SidePanel selectedItem="flashcards"/> : <></>}
        <GridItem style={{paddingLeft: flashcardBoxHorizontalPadding, paddingRight: flashcardBoxHorizontalPadding, paddingTop: "0px", width: view == "mobile" ? "100vw" : ""}}>
          {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards"/> : <></>}
          <WhiteOverlay style={{height: "72px"}}>
            <Heading4 text="Flashcards" />
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Flashcards;
