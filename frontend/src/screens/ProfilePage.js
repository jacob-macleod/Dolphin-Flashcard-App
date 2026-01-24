import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import apiManager from '../api/Api';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import Heading5 from '../componments/Text/Heading5/Heading5';
import SidePanel from '../containers/SidePanel/SidePanel';
import NewGoalPopup from '../containers/Modal/NewGoalPopup/NewGoalPopup';
import EditGoalPopup from '../containers/Modal/EditGoalPopup/EditGoalPopup';
import Heading4 from '../componments/Text/Heading4/Heading4';
import StreakWidget from '../containers/StreakWidget/StreakWidget';
import GoalsWidget from '../containers/GoalsWidget/GoalsWidget';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import Heatmap from '../containers/Heatmap/Heatmap';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import { getCookie } from '../api/Authentication';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';

function Profile() {
  // Set general variables
  const title = "Profile";
  const userWelcomeText = "You are viewing the profile of <undefined>";
  const [newGoalPopupVisible, setNewGoalPopupVisible] = useState(false);
  const [editGoalPopupVisible, setEditGoalPopupVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get("id");

  useEffect(() => {
    if (currentUser === "") {
      apiManager.getUserFromJwt(getCookie("jwtToken"), setCurrentUser);
    }
  }), [currentUser];

  // Set variables for the size
  const mobileBreakpoint = 700;
  const tabletBreakpoint = 1000;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop");

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
  }, [width]);


  // Define the third collum, which is rendered at the bottom of the screen if not
  // in desktop mode
  const third_collum = <>
      <WhiteOverlay style={{width: "100%", marginTop: view === "desktop" ? "56px": "16px"}}>
        <Heatmap />
      </WhiteOverlay>

      <WhiteOverlay style={{height: "336px"}}>
        <Heading5 style={{padding: "16px"}} text="Recently studied sets coming soon..." />
      </WhiteOverlay>
  </>
  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>
      <NewGoalPopup visible={newGoalPopupVisible} setVisible={setNewGoalPopupVisible} view={view}/>
      <EditGoalPopup visible={editGoalPopupVisible} setVisible={setEditGoalPopupVisible} view={view}/>

      <MobilePageWrapper view={view} itemClicked="dashboard">
      <GridContainer layout={
        view == "desktop" ? "240px 400px auto"
        : view == "tablet" ? "240px auto"
        : "auto"
      }
      classType={view === "mobile" ? "grid-container-mobile" : "grid-container"}
      >
        {view != "mobile" ? <SidePanel selectedItem="dashboard"/> : <></>}
        <GridItem style={{padding: "0px", width: view == "mobile" ? "100vw" : "100%"}}>
          <Heading4 text={userWelcomeText} />
          <StreakWidget />

          <GoalsWidget
            setNewGoalPopupVisible={setNewGoalPopupVisible}
            newGoalPopupVisible={newGoalPopupVisible}
            setEditGoalPopupVisible={setEditGoalPopupVisible}
            editGoalPopupVisible={editGoalPopupVisible}
            view={view}
          />

          {view != "desktop" ?
          <div style={{margin: "16px"}}>
          {third_collum}
          </div>
          : <></>}
        </GridItem>

        {view == "desktop" ?
        <GridItem style={{padding: "0px"}}>
          {third_collum}
        </GridItem>
        : <></>}
      </GridContainer>
      </MobilePageWrapper>
    {view !== "mobile" ? <BlobBackground /> : <></>}
    </div>
  );
}

export default Profile;
