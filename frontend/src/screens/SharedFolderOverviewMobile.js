import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import SidePanel from '../containers/SidePanel/SidePanel';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './Flashcards.css';
import SharedFoldersOverview from '../containers/SharedFoldersOverview/SharedFoldersOverview';
import MobilePageWrapper from '../containers/MobilePageWrapper';

function SharedFolderOverviewMobile() {
  // Set general variables
  const title = 'Flashcards';
  const [reload, setReload] = useState(true);
  const [selected, setSelected] = useState([]);
  const [createNewSharedFolderPopupVisible, setCreateNewSharedFolderPopupVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] =
    useState(view === 'mobile' ? '8px' : '16px');

  useEffect(() => {
    setFlashcardBoxHorizontalPadding(view === 'mobile' ? '8px' : '16px');
  }, [view]);



  return (
    <div style={{ top: '0px' }}>
      <Helmet>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>

      <GridContainer
        layout={view !== 'mobile' ? '240px auto' : 'auto'}
        classType="two-column-grid"
      >
        {view !== 'mobile' ? <SidePanel selectedItem="flashcards" /> : <></>}

      <MobilePageWrapper view={view} itemClicked="shared">
      <SharedFoldersOverview
          onCreateNewSharedFolder={() => {
            setCreateNewSharedFolderPopupVisible(true);
          }}
          onViewSharedFolder={() => {
            window.location.href = '/sharedfolder?folderID=exampleID';
          }}
        />
        </MobilePageWrapper>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default SharedFolderOverviewMobile;