import {React} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import SidePanel from '../containers/SidePanel';
import Heading4 from '../componments/Heading4';
import StreakWidget from '../containers/StreakWidget';
import GoalsWidget from '../containers/GoalsWidget';
import { getCookie } from '../api/Authentication';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Dashboard() {
  const title = "Dashboard";
  const userWelcomeText = "Hello there, " + getCookie("userName") + ".";

  return (
    <div style={{top: "0px;"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer layout={"240px 400px auto"}>
        <SidePanel />
        <GridItem style={{padding: "0px"}}>
          <Heading4 text={userWelcomeText} />
          <StreakWidget />
          <GoalsWidget />
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
