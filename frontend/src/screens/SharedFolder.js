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
import Heading5 from '../componments/Text/Heading5';
import Heading3 from '../componments/Text/Heading3';
import Paragraph from '../componments/Text/Paragraph';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import Button from '../componments/Button';
import GhostButton from '../componments/GhostButton';
import useTodayCards from '../hooks/useTodayCards';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';





function SharedFolder() {
  // Set general variables
  const title = "Shared Folder";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);
  const [reload, setReload] = useState(true);
  const [createFolderDialogueVisible, setCreateFolderDialogueVisible] = useState(false);
  const todayCards = useTodayCards(reload, setReload, apiManager, getCookie);
  

  

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view === "mobile" ? "8px" : "16px"
  );

  useEffect(() => {
    setFlashcardBoxHorizontalPadding(view === "mobile" ? "8px" : "16px");
  }, [view]);

  return (
    <div style={{ top: "0px" }}>

      <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid" style={{width: "100%"}}>
        {view !== "mobile" ? <SidePanel /> : <></>}


          <WhiteOverlay
            style={{
              height: "100%",
              paddingBottom: view === "mobile" ? "80px" : "",
              width: "100%",
              margin: "16px"
            }}
            className={"MainPanel"}
            visible={view === "mobile" ? false : true}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: "100%",
              padding: "16px",
            }}>
              <Heading3 text="Name of Folder" style={{textAlign: "left", marginBottom: "16px"}} />
              <Heading5 text="Short Description of Folder and its contents" style={{textAlign: "left", marginBottom: "16px"}} />
              <Button
                  text="Study All"
                  style={{display: view !== "mobile" ? "inline-block": "", marginLeft: view === "mobile" ? "0px" : ""}}
                onClick={() => {}}
                view={view}
              />
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              height: "100%",
              padding: "16px"
            }}>
            <GhostButton
                text="LEAVE"
                style={{display: view !== "mobile" ? "inline-block": "", marginLeft: view !== "mobile" ? "0px" : ""}}
                onClick={() => {window.location.href = "/flashcards";}}
              />
            </div>
          </WhiteOverlay>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default SharedFolder;
