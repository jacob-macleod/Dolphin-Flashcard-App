import { React, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { getTodayCardsFromStorage } from '../../hooks/useTodayCards';
import useCardData from '../../hooks/useCardData';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';
import '../../App.css';
import './DailyFlashcardBrowser.css';
import CardOverview from '../CardOverview/CardOverview';
import Heading5 from '../../componments/Text/Heading5';
import DelayedElement from '../DelayedElement';
import ReviewBarChart from '../../containers/ReviewBarChart';
import ReviewBarChartKey from '../ReviewBarChartKey/ReviewBarChartKey';
import Heading4 from '../../componments/Text/Heading4';
import ExpandIcon from '../../static/expand-icon.svg';
import flashcardReviewer from '../../classes/FlashcardReviewer';
import Image from '../../componments/Image/Image';
import ExitFullscreenIcon from '../../static/exit-fullscreen-icon.svg';
import GhostButton from '../../componments/GhostButton';


const slideVariants = {
  hiddenLeft: { x: '-100%', opacity: 0, position: 'fixed' },
  hiddenRight: { x: '100%', opacity: 0, position: 'fixed' },
  visible: { x: 0, opacity: 1, position: 'relative' },
  exitLeft: { x: '-20%', width: "0px", opacity: 0, position: 'fixed' },
  exitRight: { x: '100%', opacity: 0, position: 'fixed' },
};

function DailyFlashcardBrowser({ view }) {
  const [todayCards, setTodayCards] = useState(getTodayCardsFromStorage());
  const [cardIndex, setCardIndex] = useState(0);
  const [updatedCardData, setUpdatedCardData] = useState([]);
  const [addedReviewDataToCards, setAddedReviewDataToCards] = useState(false);
  const [newDataSaved, setNewDataSaved] = useState(false);
  const location = useLocation();
  const { folder, flashcardName, flashcardID } = queryString.parse(location.search, { arrayFormat: 'bracket' });
  const [cardsSaved, setCardsSaved] = useState(false);
  const [studying, setStudying] = useState(0);
  const [reviewing, setReviewing] = useState(0);
  const [notStarted, setNotStarted] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardReviewer, setCardReviewer] = useState(null);

  function saveFlashcards(newCardData) {
    /*
    Save the flashcard data
    */
   apiManager.updateCardProgress(
    getCookie("jwtToken"),
    newCardData,
    setCardsSaved
   )
  }

  useEffect(() => {
    let reviewer = new flashcardReviewer(updatedCardData, saveFlashcards);
    setCardReviewer(reviewer);
    setCurrentCard(reviewer.next());
  }, [updatedCardData]);

  function nextFibonacci(num) {
    // Edge cases for very small numbers
    if (num < 0) return 0;
    if (num === 0) return 1;
  
    let a = 0;
    let b = 1;
    let nextFib = a + b;
  
    // Generate Fibonacci numbers until we find one greater than num
    while (nextFib <= num) {
      a = b;
      b = nextFib;
      nextFib = a + b;
    }
  
    return nextFib;
  }

  function isDateBeforeToday(dateString) {
    // Parse the given date string into a Date object
    const givenDate = new Date(dateString.split('/').reverse().join('/'));
  
    // Get the current date
    const today = new Date();
  
    // Set the time of the current date to midnight to compare only the date part
    today.setHours(0, 0, 0, 0);
  
    // Compare the dates
    return givenDate < today;
  }

  const collectCardIDs = (cards, flashcardIDs) => {
    const cardIDs = [];
    const reviewStatuses = {};

    const traverse = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (value && typeof value === 'object') {
            if (flashcardIDs.includes(value.flashcardID)) {
              if (value.cards) {
                for (const cardID in value.cards) {
                  if (value.cards.hasOwnProperty(cardID)) {
                    const card = value.cards[cardID];
                    cardIDs.push(cardID);
                    reviewStatuses[cardID] = {
                      reviewStatus: card.review_status,
                      lastReview: card.last_review
                    };
                  }
                }
              }
            }
            traverse(value);
          }
        }
      }
    };

    traverse(cards);
    return { cardIDs, reviewStatuses };
  };

  const { cardIDs, reviewStatuses } = collectCardIDs(todayCards, flashcardID);
  const { cardData, cardsExist } = useCardData(cardIDs);


  useEffect(() => {
    /*
    This code should only populate card data once, otherwise it'll
    rerun and reset the card data every time a user revises a card
    */
    if (addedReviewDataToCards === false) {
      if (cardData.length > 0) {
        const newCardData = cardData.map(card => {
          if (reviewStatuses[card.cardID]) {
            return {
              ...card,
              review_status: reviewStatuses[card.cardID].reviewStatus,
              last_review: reviewStatuses[card.cardID].lastReview
            };
          }
          return card;
        });

        setUpdatedCardData(prevCardData => {
          if (JSON.stringify(newCardData) !== JSON.stringify(prevCardData)) {
            return newCardData;
          }
          return prevCardData;
        });
      }
      // Again, make sure it only populates card data once
      if (cardData.length !== 0) {
        setAddedReviewDataToCards(true);
        setCardsSaved(false);
      } else {
        setCardsSaved(true);
      }
    }
  }, [cardData, reviewStatuses]);

  const setResponse = (response) => {
    cardReviewer.reviseCard(currentCard, response);
    setCurrentCard(cardReviewer.next()); 
  };

  useEffect(() => {
  }, [updatedCardData]);

  // Count the types of cards
  useEffect(() => {
    var notStartedCards = 0;
    var studyingCards = 0;
    var recappingCards = 0;
    for (let key in updatedCardData) {
     let reviewStatus = updatedCardData[key].review_status;
     if (reviewStatus == 0.0) {
      notStartedCards++;
     } else if (reviewStatus < 1.0) {
      studyingCards++;
     } else {
      recappingCards++;
     }
    }
    setStudying(studyingCards);
    setReviewing(recappingCards);
    setNotStarted(notStartedCards);
  }, [updatedCardData]);

   const [isFullscreen, setIsFullscreen] = useState(false);
  
    const toggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };

  return (
    <>
      {
  cardReviewer != null && cardReviewer.allCardsRevised() !== true ? (
    <>
      <div className={isFullscreen ? 'fullscreen' : ''}>
        <div className="card-container">
          <CardOverview
            text={currentCard.front}
            description={currentCard.back}
            showResponseOptions={true}
            setResponse={setResponse}
            height={isFullscreen ? '100%' : '264px'}
          />
        </div>
        {!isFullscreen &&(
          <div style={{position:"relative",width:"100%"}}>
        <ReviewBarChartKey style={{ paddingTop: '8px' }} />
        <Image url={ExpandIcon} onClick={toggleFullscreen} style={{height:"26px",width:"26px"}} className='expand-button'/>                        
        </div>
        )}
        {!isFullscreen &&(
        <div className="review-bar-chart-wrapper">
          <ReviewBarChart
            studying={cardReviewer.countCards().studying}
            recapping={cardReviewer.countCards().recapping}
            notStarted={cardReviewer.countCards().notStarted}
            view={view}
          />
          <Heading4
            text={
              Math.floor(
                (cardReviewer.learnedCards /
                  (cardReviewer.countCards().studying +
                    cardReviewer.countCards().notStarted +
                    cardReviewer.countCards().recapping)) *
                  100
              ) + '%'
            }
            style={{ padding: '0px' }}
          />
        </div>
      )}
        {isFullscreen &&(
            <GhostButton style={{position:'absolute',top:'10px',right:'10px' }} text="Exit Fullscreen" onClick={toggleFullscreen} icon={ExitFullscreenIcon}/>
          )}
      </div>
    </>
  ) : cardsSaved === false ? (
    <>
      <div style={{ display: 'inline-block' }}>
        <DelayedElement child={null} childValue={null} />
        <Heading5 text="Saving cards..." />
      </div>
    </>
  ) : (
    <>
      <Heading5 text="No cards left to study today!" />
    </>
  )
}
    </>
  );
}

export default DailyFlashcardBrowser;
