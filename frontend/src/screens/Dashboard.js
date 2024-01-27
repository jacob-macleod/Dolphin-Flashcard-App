import React from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../containers/GridContainer';
import GridItem from '../containers/GridItem';
import Header from '../componments/Header';
import SidePanel from '../containers/SidePanel';
import '../componments/Text.css';
import '../componments/Link.css';
import '../componments/Bold.css';

function Dashboard() {
  const title = "Dashboard";
  return (
    <div style={{top: "0px;"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>

      <GridContainer>
        <SidePanel />
        <GridItem>
          <Header text="Main Panel" />
        </GridItem>

        <GridItem>
          <Header text="Third panel" />
        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Dashboard;
