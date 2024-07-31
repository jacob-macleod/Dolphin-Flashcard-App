import { useState, useEffect } from 'react';

const useTodayCards = (reload, setReload, apiManager, getCookie) => {
  const [todayCards, setTodayCards] = useState(() => {
    const savedData = sessionStorage.getItem('todayCards');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (reload) {
      setReload(false);
      apiManager.getTodayCards(getCookie("userID"), (data) => {
        setTodayCards(data);
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
