import React, { useState } from 'react';
const exampleCardData = [
    {
        "back": "Back 5",
        "front": "Front 5",
        "cardID": "037d15ea-a124-5dcc-af03-7e44d5bee608",
        "review_status": "0.1",
        "last_review": "30/08/2024"
    },
    {
        "back": "Back 3",
        "front": "Front 3",
        "cardID": "2ad0dbd9-a205-5882-b396-3195dbb501cf",
        "review_status": "1.0",
        "last_review": "30/08/2024"
    },
    {
        "back": "Back 1",
        "front": "Front 1",
        "cardID": "40b18db0-3886-5217-a3d2-35d51760a966",
        "review_status": "2.0",
        "last_review": "30/08/2024"
    },
    {
        "back": "Back 2",
        "front": "Front 2",
        "cardID": "4fd811ef-90d8-5115-99ed-fe43fd5d7087",
        "review_status": "0.0",
        "last_review": "30/08/2024"
    },
    {
        "back": "Back 4",
        "front": "Front 4",
        "cardID": "761380a0-ce04-53a6-8ef4-dfe31ae91d60",
        "review_status": "0.0",
        "last_review": "30/08/2024"
    },
    {
        "back": "Back 6",
        "front": "Front 6",
        "cardID": "a55072db-05f8-5e77-b7fa-837e21e98470",
        "review_status": "0.0",
        "last_review": "30/08/2024"
    }
]

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

class FlashcardReviewer {
    /* Stores the spaced repetition algorithm for reviewing flashcards in Daily Mode */
    constructor(cardData, saveFlashcardData) {
        this._cardData = cardData;
        this._cardIndex = 0;
        // When revising unlearned cards, you go 5 cards ahead, go back to the second one,
        // and continue from there - this stores the index 5 cards ahead
        this._highestCardIndex = 0;
        // This stores how many cards ahead you have gone - max is 5
        this._cardLoopIndex = 0;
        this.learnedCards = 0;

        this._recappingCards = [];
        this._unlearnedCards = [];
        this._currentCollection = null;
        this._saveFlashcardData = saveFlashcardData;
        this._cardsSaved = false;
        this.#categoriseCards();
    }

    next() {
        /* Get the next card in the collection */
        // Update the collection if needed
        if (this._currentCollection === "recapping" && this._recappingCards.length === 0) {
            this._currentCollection = "unlearned";
        } else if (this._currentCollection === "unlearned" && this._unlearnedCards.length === 0) {
            return "finished";
        }

        if (this._currentCollection === "recapping") {
            this._cardIndex++;
            if (this._cardIndex >= this._recappingCards.length) {
                this._cardIndex = 0;
            }
            return this._recappingCards[this._cardIndex];
        } else {
            // Go 5 cards ahead, go back to the second one, and continue from there

            if (this._cardLoopIndex >= 5) {
                // Go 4 cards back
                if (this._cardIndex - 4 >= 0) {
                    this._cardIndex = this._cardIndex - 1;
                } else {
                    this._cardIndex = 0;
                }
                this._cardLoopIndex = 0;


            } else {
                this._cardIndex ++;
                if (this._cardIndex >= this._unlearnedCards.length) {
                    this._cardIndex = 0;
                    this._highestCardIndex = 0;
                }
                this._cardLoopIndex ++;
                if (this._highestCardIndex == this._cardIndex - 1) {
                    this._highestCardIndex ++;
                }
            }
            return this._unlearnedCards[this._cardIndex];
        }
    }

    reviseCard(cardData, feedback) {
        /* Revise a card and update the review status accordingly */
        let cardID = cardData.cardID;
        let cardIndex = this.#findCardIndex(cardID);
        let cardDataIndex = cardIndex[0];
        let cardCollectionIndex = cardIndex[1];
        let cardLocation = cardIndex[2];
        let updatedCardData = false; // Whether the card data has been updated yet

        // Get the current review status (from the data in the class)
        let reviewStatus = this._cardData[cardDataIndex].review_status;
        let daily = parseInt(reviewStatus.split(".")[0]);
        let subDaily = parseInt(reviewStatus.split(".")[1]);
        let lastReview = new Date().toLocaleDateString('en-GB')

        // Update the review status based on the feedback - assume feedback will "I'm not sure", "I know" or "This is easy"
        if (feedback === "I'm not sure") {
            daily = 0;
            subDaily = 0;
            // If the card is being recapped
            if (cardLocation === "recapping") {
                // Remove the card from recappingCards and add it to unlearnedCards
                this._recappingCards.splice(cardIndex[1], 1);
                this._unlearnedCards.push(this._cardData[cardDataIndex]);
                cardCollectionIndex = "unlearned";
                updatedCardData = true;
            }

        } else if (feedback === "I know") {
            // If the card is being recapped
            if (cardLocation === "recapping") {
                // Just update daily
                daily = nextFibonacci(daily);
                subDaily = 0;
                // Remove the card from recapping
                this._recappingCards.splice(cardIndex[1], 1);
            } else {
                // Update subDaily
                subDaily += 3;
                if (subDaily > 10) {
                    subDaily = 0;
                    daily += 1;

                    // Remove the card from unlearnedCards
                    this._unlearnedCards.splice(cardIndex[1], 1);
                    cardCollectionIndex = "recapping";
                    updatedCardData = true
                    this.learnedCards++;
                }
            }
        } else if (feedback === "This is easy") {
            subDaily = 0;
            // daily = two fibonacci numbers ahead
            daily = nextFibonacci(nextFibonacci(daily));
            // Remove the card from where it is
            if (cardLocation === "recapping") {
                this._recappingCards.splice(cardIndex[1], 1);
            } else {
                this._unlearnedCards.splice(cardIndex[1], 1);
                updatedCardData = true;
            }
            this.learnedCards++;
        }

        this._cardData[cardDataIndex].review_status = `${daily}.${subDaily}`;
        this._cardData[cardDataIndex].last_review = lastReview;

        // If the card has not been updated yet
        if (!updatedCardData) {
            // Update the card in recappingCards or unlearnedCards
            if (cardCollectionIndex === "recapping") {
                this._recappingCards[cardIndex[1]] = this._cardData[cardDataIndex];
            } else {
                this._unlearnedCards[cardIndex[1]] = this._cardData[cardDataIndex];
            }
        }
    }

    countCards() {
        /* Count the number of cards in each category */
        var notStartedCards = 0;
        var studyingCards = 0;
        var recappingCards = 0;
        for (let key in this._cardData) {
         let reviewStatus = this._cardData[key].review_status;
         if (reviewStatus == 0.0) {
          notStartedCards++;
         } else if (reviewStatus < 1.0) {
          studyingCards++;
         } else {
          recappingCards++;
         }
        }

        return {"notStarted": notStartedCards, "studying": studyingCards, "recapping": recappingCards};
    }

    #findCardIndex(cardID) {
        /* Find the index of a card in cardData, then find the index in
        recappingCards or unlearnedCards */
        // cardData index, recappingCards/unlearnedCards index, whether the card is found in recappingCards or unlearnedCards
        let indexes = [null, null, null];
        // Find the index in cardData
        for (let i=0; i<this._cardData.length; i++) {
            if (this._cardData[i].cardID === cardID) {
                indexes[0] = i;
            }
        }

        // Find the index in recappingCards - if not found, indexes[1] and [2] will be null
        for (let i=0; i<this._recappingCards.length; i++) {
            if (this._recappingCards[i].cardID === cardID) {
                indexes[1] = i;
                indexes[2] = "recapping";
            }
        }

        // Find the index in unlearnedCards - if not found, indexes[1] and [2]will not be changed
        for (let i=0; i<this._unlearnedCards.length; i++) {
            if (this._unlearnedCards[i].cardID === cardID) {
                indexes[1] = i;
                indexes[2] = "unlearned";
            }
        }

        // We assume the card index will always be found - indexes will not be null
        return indexes;
    }

    #categoriseCards() {
        /* Categorise the cards into "recapping" and "unlearned" */
        for (let i=0; i<this._cardData.length; i++) {
            let cardType = this.#getCardType(this._cardData[i]);
            if (cardType === "recapping") {
                this._recappingCards.push(this._cardData[i]);
            } else {
                this._unlearnedCards.push(this._cardData[i]);
            }
        }

        this._currentCollection = "recapping";
    }

    #getCardType(cardDefinition) {
        /* Decide if a flashcard is "recapping", "studying" or "not started" */
        let reviewStatus = cardDefinition.review_status;
        let daily = reviewStatus.split(".")[0];
        let subDaily = reviewStatus.split(".")[1];

        if (daily === "0" && subDaily === "0") {
            return "not started";
        } else if (daily === "0") {
            return "studying";
        } else {
            return "recapping";
        }
    }

    allCardsRevised() {
        /* Check if all cards have been revised */
        if (this._recappingCards.length === 0 && this._unlearnedCards.length === 0) {
            if (this._cardsSaved === false) {
                this._saveFlashcardData(this._cardData);
                console.log("Saving flashcard data");
                this._cardsSaved = true;
            }
            return true;
        } else {
            return false;
        }
    }
}

export default FlashcardReviewer;