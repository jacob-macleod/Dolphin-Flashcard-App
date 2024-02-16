"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWatchLocalStorageValue = void 0;
const react_1 = require("react");
/**
 * Triggers `onChange` when another browser tab instance mutates the LS value.
 */
const useWatchLocalStorageValue = ({ key: watchKey, onChange, }) => {
    function handleStorageChange({ key, newValue }) {
        if (key === watchKey)
            onChange(newValue);
    }
    (0, react_1.useEffect)(() => {
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []); // eslint-disable-line
};
exports.useWatchLocalStorageValue = useWatchLocalStorageValue;
