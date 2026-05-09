import { useState, useEffect } from 'react';
const USE_SESSION_CACHE = false;

const useTodayCards = (reload, setReload, apiManager, getCookie) => {
  const [todayCards, setTodayCards] = useState(() => {
    /*
    The use of session storage has been commented out for now. When you
    learn a card, the "today cards" list needs to be updated next time the
    user returns to the flashcard page. But there isn't an obvious methodology
    to find when the user has returned to the flashcard page specifically after editing and
    saving a card. In the interests of simplicity, for now, the today cards list will be fetched
    from the server every time the user visits the flashcard page, and the session storage will be ignored.

    If this becomes slow in the future or uses too many requests, we can consider re-implementing
    session storage, and finding a way to trigger an update to the session storage when the user returns to the flashcard page after editing and saving a card
    */
    if (!USE_SESSION_CACHE) return null;

    const savedData = sessionStorage.getItem('todayCards');
    return savedData ? JSON.parse(savedData) : null;

  });

  useEffect(() => {
    // Fetch if:
    // 1. reload triggered
    // 2. Or no cached data
    if (reload || todayCards === null) {
      setReload(false);

      apiManager.getTodayCards(getCookie("jwtToken"), (data) => {
        setTodayCards(data);

        // No matter what, save them in storage for getTodayCardsFromStorage to access,
        // even if we aren't using the session cache for the main state
        sessionStorage.setItem('todayCards', JSON.stringify(data));
      });
    }
  }, [reload, apiManager, getCookie]);


  return todayCards;
};

export default useTodayCards;

export const getTodayCardsFromStorage = () => {
  const savedData = sessionStorage.getItem('todayCards');
  return savedData ? JSON.parse(savedData) : [];
};
