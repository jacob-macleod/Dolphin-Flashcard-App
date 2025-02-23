import serverURL from './config';

// Singleton class
class ApiManager {
    constructor() {
        if (!ApiManager.instance) {
            ApiManager.instance = this;
        }
        return ApiManager.instance;
    }

    fetchData (data, url, successCallback, method="POST") {
        fetch(serverURL + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed methods
                'Access-Control-Allow-Headers': 'Content-Type'
                // Add any other headers if required
            },
            body: JSON.stringify(data) // Convert data to JSON string
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse JSON response
            }
            throw new Error('Network response was not ok.');
        })
        .then(successCallback)
        .catch(error => {
            console.error('There was an error:', error);
        });
    }

    calculateStreak(jwtToken, setStreak) {
        const data = {
            jwtToken: jwtToken
        };
        const url = 'calculate-streak';

        this.fetchData(data, url, ([streak, status]) => {
            if (status === 200) {
                // Set streak using the provided setStreak function
                setStreak(streak.streak);
            }
        });
    }

    updateGoals(jwtToken, setGoals) {
        const data = {
            jwtToken: jwtToken
        };
        const url = 'update-goal-status';

        this.fetchData(data, url, goals => {
            setGoals(goals);
        });
    }

    createXpGoal(jwtToken, goalXp, endDate, setStatus) {
        const url = 'create-xp-goal';
        const data = {
            jwtToken: jwtToken,
            goalXP: goalXp,
            endDate: endDate
        };

        this.fetchData(data, url, status => {
            setStatus(status);
        });
    }

    createCardGoal(jwtToken, numOfCards, endDate, setStatus) {
        const url = 'create-card-goal';
        const data = {
            jwtToken: jwtToken,
            cardsToRevise: numOfCards,
            endDate: endDate
        };

        this.fetchData(data, url, status => {
            setStatus(status);
        });
    }

    editCardGoal(jwtToken, goalID, newEndDate, newTitle, newCardsToRevise, setPopupVisible) {
        const url = 'edit-card-goal';
        const data = {
            jwtToken: jwtToken,
            goalID: goalID,
            newEndDate: newEndDate,
            newTitle: newTitle,
            newCardsToRevise: newCardsToRevise
        }

        this.fetchData(data, url, setPopupVisible.bind(null, false));
    }

    editXpGoal(jwtToken, goalID, newEndDate, newTitle, newGoalXP, setPopupVisible) {
        const url = 'edit-xp-goal';
        const data = {
            jwtToken: jwtToken,
            goalID: goalID,
            newEndDate: newEndDate,
            newTitle: newTitle,
            newGoalXP: newGoalXP
        }

        this.fetchData(data, url, setPopupVisible.bind(null, false));
    }

    deleteGoal(jwtToken, goalID, reloadPage) {
        const url = 'delete-goal';
        const data = {
            jwtToken: jwtToken,
            goalID: goalID
        }
        this.fetchData(data, url, status => {
            reloadPage();
        }, "DELETE");
    
    }

    getHeatmap(jwtToken, setHeatmap) {
        const url = 'get-heatmap';
        const data = {
            jwtToken: jwtToken
        };
        this.fetchData(data, url, heatmapData => {
            setHeatmap(heatmapData);
        })
    }


    getXP(jwtToken, setWeeklyXP, setTotalXP) {
        const url = 'get-user-stats';
        const data = {
            jwtToken: jwtToken
        };
        this.fetchData(data, url, xpData => {
            setWeeklyXP(xpData[0].weeklyXP);
            setTotalXP(xpData[0].totalXP);
        }, "POST");
    }
    getWeeklyXp(jwtToken, setWeeklyXp) {
        const url = 'get-weekly-xp';
        const data = {
            jwtToken: jwtToken
        };
        this.fetchData(data, url, weeklyXp => {
            setWeeklyXp(weeklyXp);
        });
    }

    getTotalXp(jwtToken, setTotalXP) {
        const url = 'get-total-xp';
        const data = {
            jwtToken: jwtToken
        };
        this.fetchData(data, url, totalXp => {
            setTotalXP(totalXp);
        });
    }

    getTodayCards(jwtToken, setTodayCards) {
        const url = 'get-today-cards';
        const data = {
            jwtToken: jwtToken
        }

        this.fetchData(data, url, todayCards => {
            setTodayCards(todayCards);
        });
    }

    moveFlashcard(jwtToken, currentLocation, flashcardName, moveLocation, setPopupVisible, setReload) {
        const url = 'move-flashcard-set';
        const data = {
            "jwtToken": jwtToken,
            "currentLocation": currentLocation,
            "flashcardName": flashcardName,
            "moveLocation": moveLocation
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }

    createFlashcard(
        jwtToken,
        flashcardName,
        flashcardDescription,
        folder,
        cards,
        loadEditFlashcardPage,
        data=null
    ) {
        /*
        Create a flashcard
        */
        const url = 'create-flashcard';
        if (data === null) {
            data = {
                "jwtToken": jwtToken,
                "flashcardName": flashcardName,
                "flashcardDescription": flashcardDescription,
                "folder": folder,
                "cards": cards
            }
        }

        this.fetchData(data, url, status => {
            data.flashcardID = status[0].flashcardID;
            loadEditFlashcardPage(data);
        });
    
    }

    createFolder(jwtToken, folderPath, setPopupVisible, setReload) {
        const url = 'create-folder';
        const data = {
            "jwtToken": jwtToken,
            "folder": folderPath
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }

    getFlashcard(jwtToken, flashcardID, setFlashcardData) {
        const url = 'get-flashcard';
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID,
        }

        this.fetchData(data, url, flashcardData => {
            setFlashcardData(flashcardData[0]);
        });
    }

    getPublicFlashcard(flashcardID, setFlashcardData) {
        const url = 'get-public-flashcard';
        const data = {
            "flashcardID": flashcardID,
        }

        this.fetchData(data, url, flashcardData => {
            setFlashcardData(flashcardData[0]);
        });
    }

    getFlashcardItem(cardID, setFlashcardItem) {
        const url = 'get-flashcard-item';
        const data = {
            "cardID": cardID
        }

        this.fetchData(data, url, flashcardItem => {
            setFlashcardItem({...flashcardItem[0], cardID: cardID});
        });
    }

    updateCardProgress(jwtToken, cardData, setCardsRevised) {
        const url = 'update-card-progress';
        const data = {
            "jwtToken": jwtToken,
            "cardData": cardData
        }

        this.fetchData(data, url, response => {
            setCardsRevised(response);
        });
    }

    deleteFlashcard(jwtToken, flashcardID, setPopupVisible, setReload) {
        const url = 'delete-flashcard';
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        }, "DELETE");
    }

    renameFlashcard(jwtToken, flashcardID, newName, setPopupVisible, setReload) {
        const url = 'rename-flashcard';
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID,
            "newName": newName
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }

    deleteFolder(jwtToken, folderPath, setPopupVisible, setReload) {
        const url = 'delete-folder';
        const data = {
            "jwtToken": jwtToken,
            "folder": folderPath
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        }, "DELETE");
    }

    renameFolder(jwtToken, folderPath, newName, setPopupVisible, setReload) {
        const url = 'rename-folder';
        const data = {
            "jwtToken": jwtToken,
            "currentName": folderPath,
            "newName": newName
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }

    deleteCard(jwtToken, flashcardID, cardID, setLoadingIconVisible, setReload) {
        const url = 'delete-card';
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID,
            "cardID": cardID
        }

        this.fetchData(data, url, status => {
            setLoadingIconVisible(null);
            setReload(true);
        }, "DELETE");
    }

    searchForFlashcard(searchTerm, setResults) {
        const url = 'search?name=' + searchTerm
        this.fetchData({}, url, results => {
            setResults(results);
        });
    }

    addFlashcardToFolder(jwtToken, flashcardID, folder, setLoadFlashcard) {
        const url = "add-flashcard-to-folder"
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID,
            "folder": folder
        }

        this.fetchData(data, url, status => {
            // Load the flashcard when finished
            setLoadFlashcard(folder);
        });
    }

    getUser(userID, setUserData) {
        const url = 'get-user';
        const data = {
            "userID": userID
        }

        this.fetchData(data, url, userData => {
            setUserData(userData[0]);
        });
    }

    getUserFromJwt(jwtToken, setUserData) {
        const url = 'get-user-from-jwt';
        const data = {
            "jwtToken": jwtToken
        }

        this.fetchData(data, url, userData => {
            setUserData(userData[0]);
        });
    }

    flashcardExists(jwtToken, flashcardID, setFlashcardExists) {
        const url = 'flashcard-exists';
        const data = {
            "jwtToken": jwtToken,
            "flashcardID": flashcardID
        }

        this.fetchData(data, url, flashcardExists => {
            setFlashcardExists(flashcardExists);
        });
    }
}

const apiManager = new ApiManager();
export default apiManager;
