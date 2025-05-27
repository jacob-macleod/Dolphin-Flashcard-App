import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Get initial theme from localStorage, default to light theme if none saved
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Update localStorage and body class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);