import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Heading5 from '../componments/Heading5';
import SidePanel from '../containers/SidePanel';
import NewGoalPopup from '../containers/NewGoalPopup';
import EditGoalPopup from '../containers/EditGoalPopup';
import Heading4 from '../componments/Heading4';
import StreakWidget from '../containers/StreakWidget';
import GoalsWidget from '../containers/GoalsWidget';
import WhiteOverlay from '../componments/WhiteOverlay';
import HamburgerBar from '../componments/HamburgerBar';
import Heatmap from '../componments/Heatmap';
import { getCookie } from '../api/Authentication';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Dashboard() {
  // Set general variables
  const title = "Dashboard";
  const userWelcomeText = "Hello there, " + getCookie("userName") + ".";
  const [newGoalPopupVisible, setNewGoalPopupVisible] = useState(false);
  const [editGoalPopupVisible, setEditGoalPopupVisible] = useState(false);
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);

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
      <WhiteOverlay style={{width: "100%", marginTop: "72px"}}>
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

      <GridContainer layout={
        view == "desktop" ? "240px 400px auto"
        : view == "tablet" ? "240px auto"
        : "auto"
      }>
        {view != "mobile" ? <SidePanel selectedItem="dashboard"/> : <></>}
        <GridItem style={{padding: "0px", width: view == "mobile" ? "100vw" : "100%"}}>
          {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="dashboard"/> : <></>}
          <Heading4 text={userWelcomeText} />
          <StreakWidget />

          <GoalsWidget
            setNewGoalPopupVisible={setNewGoalPopupVisible}
            newGoalPopupVisible={newGoalPopupVisible}
            setEditGoalPopupVisible={setEditGoalPopupVisible}
            editGoalPopupVisible={editGoalPopupVisible}
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
=      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Dashboard;
