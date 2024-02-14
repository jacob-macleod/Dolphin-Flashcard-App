import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import DelayedElement from '../componments/DelayedElement';
import Header from '../componments/Header';
import SidePanel from '../containers/SidePanel';
import Heading4 from '../componments/Heading4';
import Heading5 from '../componments/Heading5';
import WhiteOverlay from '../componments/WhiteOverlay';
import { getCookie } from '../api/Authentication';
import { calculateStreak } from '../api/Api';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Dashboard() {
  const title = "Dashboard";
  const userWelcomeText = "Hello there, " + getCookie("userName") + ".";
  const [streak, setStreak] = useState(null)
  const panelTitleStyle = {
    padding: "8px"
  }
  const overlayStyle = {
    marginLeft: "16px",
    marginRight: "0px",
    width: "90%"
  }

  useEffect(() => {
    calculateStreak(getCookie("userID"), setStreak)
  }, []);

  return (
    <div style={{top: "0px;"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout={"240px 30vw auto"}>
        <SidePanel />
        <GridItem style={{padding: "0px"}}>
          <Heading4 text={userWelcomeText} />

          <WhiteOverlay style={overlayStyle}
            children={
              <>
              <Heading5 text="Streak" style={panelTitleStyle} />
              <DelayedElement child={<Header text={streak} />} childValue={streak} />
              </>
            }
          />
        </GridItem>

        <GridItem style={{padding: "0px"}}>
          <Header text="Third panel" />
        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Dashboard;
