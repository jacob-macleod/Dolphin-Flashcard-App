import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import Heading3 from '../componments/Text/Heading3';
import Paragraph from '../componments/Text/Paragraph';
import MobilePageWrapper from '../containers/MobilePageWrapper';

function PageNotFound() {
  // Set general variables
  const title = "A page was not found";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view === "mobile" ? "8px" : "16px"
  );

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
        {view !== "mobile" ? <SidePanel /> : <></>}

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

          <WhiteOverlay
            style={{
              height: "max-content",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: view === "desktop" ? "100%" : "calc(100% - 16px)",
            }}
            visible={view === "mobile" ? false : true}
          >
            <MobilePageWrapper view={view} itemClicked="">
              <div style={{ maxWidth: "1200px", margin: "auto" }}>
                <Heading3 text="We're sorry..." />
                <Paragraph text="The page you are looking for does not exist yet!" />
              </div>
            </MobilePageWrapper>
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default PageNotFound;
