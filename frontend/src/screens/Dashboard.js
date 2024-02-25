import {React, useState} from 'react';
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
import Heatmap from '../componments/Heatmap';
import { getCookie } from '../api/Authentication';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Dashboard() {
  const title = "Dashboard";
  const userWelcomeText = "Hello there, " + getCookie("userName") + ".";
  const [newGoalPopupVisible, setNewGoalPopupVisible] = useState(false);
  const [editGoalPopupVisible, setEditGoalPopupVisible] = useState(false);

  return (
    <div style={{top: "0px;"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>
      <NewGoalPopup visible={newGoalPopupVisible} setVisible={setNewGoalPopupVisible} />
      <EditGoalPopup visible={editGoalPopupVisible} setVisible={setEditGoalPopupVisible} />

      <GridContainer layout={"240px 400px auto"}>
        <SidePanel />
        <GridItem style={{padding: "0px"}}>
          <Heading4 text={userWelcomeText} />
          <StreakWidget />

          <GoalsWidget
            setNewGoalPopupVisible={setNewGoalPopupVisible}
            newGoalPopupVisible={newGoalPopupVisible}
            setEditGoalPopupVisible={setEditGoalPopupVisible}
            editGoalPopupVisible={editGoalPopupVisible}
          />

        </GridItem>

        <GridItem style={{padding: "0px"}}>

          <WhiteOverlay style={{width: "max-content", marginTop: "72px"}}>
            <Heatmap />
          </WhiteOverlay>

          <WhiteOverlay style={{height: "336px"}}>
            <Heading5 style={{padding: "16px"}} text="Recently studies sets coming soon..." />
          </WhiteOverlay>
        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Dashboard;
