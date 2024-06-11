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

    calculateStreak(userID, setStreak) {
        const data = {
            userID: userID
        };
        const url = 'calculate-streak';

        this.fetchData(data, url, ([streak, status]) => {
            if (status === 200) {
                // Set streak using the provided setStreak function
                setStreak(streak.streak);
            }
        });
    }

    updateGoals(userID, setGoals) {
        const data = {
            userID: userID
        };
        const url = 'update-goal-status';

        this.fetchData(data, url, goals => {
            setGoals(goals);
        });
    }

    createXpGoal(userID, goalXp, endDate, setStatus) {
        const url = 'create-xp-goal';
        const data = {
            userID: userID,
            goalXP: goalXp,
            endDate: endDate
        };

        this.fetchData(data, url, status => {
            setStatus(status);
        });
    }

    createCardGoal(userID, numOfCards, endDate, setStatus) {
        const url = 'create-card-goal';
        const data = {
            userID: userID,
            cardsToRevise: numOfCards,
            endDate: endDate
        };

        this.fetchData(data, url, status => {
            setStatus(status);
        });
    }

    editCardGoal(userID, goalID, newEndDate, newTitle, newCardsToRevise, setPopupVisible) {
        const url = 'edit-card-goal';
        const data = {
            userID: userID,
            goalID: goalID,
            newEndDate: newEndDate,
            newTitle: newTitle,
            newCardsToRevise: newCardsToRevise
        }

        this.fetchData(data, url, setPopupVisible.bind(null, false));
    }

    editXpGoal(userID, goalID, newEndDate, newTitle, newGoalXP, setPopupVisible) {
        const url = 'edit-xp-goal';
        const data = {
            userID: userID,
            goalID: goalID,
            newEndDate: newEndDate,
            newTitle: newTitle,
            newGoalXP: newGoalXP
        }

        this.fetchData(data, url, setPopupVisible.bind(null, false));
    }

    deleteGoal(userID, goalID, reloadPage) {
        const url = 'delete-goal';
        const data = {
            userID: userID,
            goalID: goalID
        }
        this.fetchData(data, url, status => {
            reloadPage();
        }, "DELETE");
    
    }

    getHeatmap(userID, setHeatmap) {
        const url = 'get-heatmap';
        const data = {
            userID: userID
        };
        this.fetchData(data, url, heatmapData => {
            setHeatmap(heatmapData);
        })
    }


    getXP(userID, setWeeklyXP, setTotalXP) {
        const url = 'get-user-stats';
        const data = {
            userID: userID
        };
        this.fetchData(data, url, xpData => {
            setWeeklyXP(xpData[0].weeklyXP);
            setTotalXP(xpData[0].totalXP);
        }, "POST");
    }
    getWeeklyXp(userID, setWeeklyXp) {
        const url = 'get-weekly-xp';
        const data = {
            userID: userID
        };
        this.fetchData(data, url, weeklyXp => {
            setWeeklyXp(weeklyXp);
        });
    }

    getTotalXp(userID, setTotalXP) {
        const url = 'get-total-xp';
        const data = {
            userID: userID
        };
        this.fetchData(data, url, totalXp => {
            setTotalXP(totalXp);
        });
    }

    getTodayCards(userID, setTodayCards) {
        const url = 'get-today-cards';
        const data = {
            userID: userID
        }

        this.fetchData(data, url, todayCards => {
            setTodayCards(todayCards);
        });
    }

    moveFlashcard(userID, currentLocation, flashcardID, moveLocation, setPopupVisible, setReload) {
        const url = 'move-flashcard-set';
        const data = {
            "userID": userID,
            "currentLocation": currentLocation,
            "flashcardID": flashcardID,
            "moveLocation": moveLocation
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }

    createFlashcard(
        userID,
        flashcardName,
        flashcardDescription,
        folder,
        cards,
        loadEditFlashcardPage
    ) {
        /*
        Create a flashcard
        */
        const url = 'create-flashcard';
        const data = {
            "userID": userID,
            "flashcardName": flashcardName,
            "flashcardDescription": flashcardDescription,
            "folder": folder,
            "cards": cards
       }

        this.fetchData(data, url, status => {
            loadEditFlashcardPage(data);
        });
    
    }

    createFolder(userID, folderPath, setPopupVisible, setReload) {
        const url = 'create-folder';
        const data = {
            "userID": userID,
            "folder": folderPath
        }

        this.fetchData(data, url, status => {
            setPopupVisible(false);
            setReload(true);
        });
    }
}

const apiManager = new ApiManager();
export default apiManager;
