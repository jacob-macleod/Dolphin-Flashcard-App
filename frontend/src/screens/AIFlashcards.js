import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useTodayCards from '../hooks/useTodayCards';
import useWindowSize from '../hooks/useWindowSize';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import DelayedElement from '../containers/DelayedElement';
import Button from '../componments/Button';
import CreateFlashcardSetDialogue from '../containers/Modal/CreateFlashcardSetDialogue/CreateFlashcardSetDialogue';
import DeleteFlashcardConfirmation from '../containers/Modal/DeleteFlashcardConfirmation';
import MobilePageWrapper from '../containers/MobilePageWrapper';
import Paragraph from '../componments/Text/Paragraph';
import apiManager from '../api/Api';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import './Flashcards.css';
import "./AIFlashcards.css"
import { getCookie } from '../api/Authentication';
import Heading5 from '../componments/Text/Heading5/Heading5';
import PromptBar from '../componments/PromptBar/PromptBar';
import BoldParagraph from '../componments/Text/BoldParagraph/BoldParagraph';
import AICardRow from '../componments/AICardRow/AICardRow';
import NewFlashcardPopup from '../containers/Modal/NewFlashcardPopup/NewFlashcardPopup';


function AIFlashcards() {
  // Set general variables


  
  const [aiFlashcardData, setAIFlashcardData] = useState(null);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const view = useWindowSize(mobileBreakpoint, tabletBreakpoint);

  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] =
    useState(view === 'mobile' ? '8px' : '16px');

  const [deleteFlashcardConfirmationVisible, showDeleteFlashcardConfirmation] =
    useState(false);
  const [reload, setReload] = useState(false);
  const todayCards = useTodayCards(reload, setReload, apiManager, getCookie);
  const [editFlashcardPopupVisible, setEditFlashcardPopupVisible] =
    useState(false);
  const [initialTerm, setInitialTerm] = useState('');
  const [initialDefinition, setInitialDefinition] = useState('');
  const [prompt, setPrompt] = useState('');
  const [timesFlashcardsGenerated, setTimesFlashcardsGenerated] = useState(0);
  const [createCardDialogueVisible, setCreateCardDialogueVisible]= useState(false);
  // useEffect(() => {
  //   console.log("AI Flashcard Data:", aiFlashcardData);
  // }, [aiFlashcardData]);

  function getTodayDate() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

  useEffect(() => {
    console.log(timesFlashcardsGenerated)
    if (timesFlashcardsGenerated > 0) {
      console.log(prompt)
      apiManager.getAIFlashcardData(getCookie("jwtToken"), prompt, '', setAIFlashcardData,getTodayDate);
    }
    else {

    }
  }, [timesFlashcardsGenerated]);

  useEffect(() => {
    console.log("Updated flashcards:", aiFlashcardData);
  }, [aiFlashcardData]);





  return (
    <div style={{ top: '0px' }}>
      <Helmet>
        <title>AI Flashcards</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>

       <CreateFlashcardSetDialogue
        visible={createCardDialogueVisible}
        setVisible={setCreateCardDialogueVisible}
        view={view}
        setReload={setReload}
        flashcards={aiFlashcardData}
      />

      <DeleteFlashcardConfirmation
        visible={deleteFlashcardConfirmationVisible}
        setVisible={showDeleteFlashcardConfirmation}
        view={view}
        setReload={setReload}
      />
      <NewFlashcardPopup
        visible={editFlashcardPopupVisible}
        setVisible={setEditFlashcardPopupVisible}
        view={view}
        flashcardData={aiFlashcardData}
        flashcardItems={aiFlashcardData}
        setFlashcardItems={setAIFlashcardData}
        editExistingFlashcard={true}
        initialTerm={initialTerm}
        initialDefinition={initialDefinition}
        isInAIPage={true}
      />


      <GridContainer
        layout={view !== 'mobile' ? '240px auto' : 'auto'}
        classType="two-column-grid"
      >
        {view !== 'mobile' ? <SidePanel selectedItem="flashcards" /> : <></>}
        <GridItem
          style={{
            paddingLeft:
              view === 'mobile' ? '0px' : flashcardBoxHorizontalPadding,
            paddingRight:
              view === 'mobile' ? '0px' : flashcardBoxHorizontalPadding,
            paddingTop: '0px',
            paddingBottom: view === 'mobile' ? '0px' : '',
            width: view === 'mobile' ? '100vw' : '',
            display: view === 'mobile' ? 'block' : 'flex',
            flexDirection: 'column',
            margin: view === "mobile" ? "0px" : '16px',
          }}
        >
          <MobilePageWrapper view={view} itemClicked="dashboard">
          <WhiteOverlay
            style={{
              height: '100%',
              paddingBottom: '',
              width: '100%',
              marginBottom: '0px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            visible={view === "desktop" ? true : false}

          >
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row', alignItems: view === 'mobile' ? 'flex-start' : 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '100px', marginBottom: '30px', height: '100px' }}>
              <PromptBar width={"100%"}
                style={{ margin: "auto" }}

                setSearchTerm={setPrompt}

                height={'100%'}
                borderRadius="8px 0 0 8px"
              />
              <Button
                text="Submit"
                style={{
                  margin: "0px",
                  width: "114px",
                  borderRadius: "0px 8px 8px 0px",
                  height: "122px",
                  marginTop: "0px"
                }}
                onClick={() => {
                  setAIFlashcardData(null)
                  setTimesFlashcardsGenerated(prev => prev + 1)
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
              <div className='two-column-text'>
                <BoldParagraph text="Term:" />
                <BoldParagraph text="Definition:" />
              </div>

              <div
              className="flashcards-content-wrapper"
              >
              {
                aiFlashcardData === null && timesFlashcardsGenerated <= 0
                  ? <Heading5 text="You dont have any flashcards yet. Submit a prompt to generate flashcards!" style={{ margin: "auto" }} />
                  : aiFlashcardData === null && timesFlashcardsGenerated > 0
                    ? <div className={"loading-icon-wrapper"} style={{ width: '100%' }}>
                      <DelayedElement child={<></>} childValue={null} />
                    </div>
                    :
                    aiFlashcardData.cards?.length !== 0
                      ? aiFlashcardData.map((item) => (
                        <AICardRow
                          key={item.id}
                          cardID={item.cardID}
                          front={item.front}
                          back={item.back}
                          //flashcardID={aiFlashcardData.flashcard_id}
                          view={view}
                          showEditPopup={setEditFlashcardPopupVisible}

                          setInitialTerm={setInitialTerm}
                          setInitialDefinition={setInitialDefinition}
                          setReload={setReload}
                          isInEditPage={true}
                          isInAIPage={true}
                          setAIFlashcardData={setAIFlashcardData}
                        />
                      ))
                      : <div className={"loading-icon-wrapper"} style={{ width: '100%' }}>
                        <DelayedElement child={<></>} childValue={null} />
                      </div>}
                </div>

              <Button
                text="Create Set"
                style={{
                  display: view !== 'mobile' ? 'inline-block' : '',
                  marginLeft: 'auto',
                  marginRight: '60px',
                }}
                onClick={() => {
                    setCreateCardDialogueVisible(todayCards);
                }}
                view={view}
              />


              <Paragraph
                text="AI-generated flashcards may contain errors. Please ensure you have checked flashcards."
                style={{
                  textAlign: "center", marginTop: "16px", color: "var(--grey-header-light)",
                  paddingBottom: view === "mobile" ? "70px" : "0px"
                }}
              />
            </div>
          </WhiteOverlay>
          </MobilePageWrapper>
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </div>
  );
}

export default AIFlashcards;
