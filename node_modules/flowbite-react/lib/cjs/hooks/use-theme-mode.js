"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeMode = void 0;
const react_1 = require("react");
const is_client_1 = require("../helpers/is-client");
const use_watch_localstorage_value_1 = require("../hooks/use-watch-localstorage-value");
const theme_store_1 = require("../theme-store");
const DEFAULT_MODE = 'light';
const LS_THEME_MODE = 'flowbite-theme-mode';
const SYNC_THEME_MODE = 'flowbite-theme-mode-sync';
const useThemeMode = () => {
    const [mode, setMode] = (0, react_1.useState)(getInitialMode((0, theme_store_1.getThemeMode)()));
    /**
     * Persist `mode` in local storage and add/remove `dark` class on `html`
     */
    (0, react_1.useEffect)(() => {
        setModeInLS(mode);
        setModeInDOM(mode);
    }, []); // eslint-disable-line
    /**
     * Sync all tabs with the latest theme mode value
     */
    (0, use_watch_localstorage_value_1.useWatchLocalStorageValue)({
        key: LS_THEME_MODE,
        onChange(newValue) {
            if (newValue)
                return handleSetMode(newValue);
        },
    });
    /**
     * Keep the other instances of the hook in sync (bi-directional)
     */
    useSyncMode((mode) => setMode(mode));
    /**
     * Sets `mode` to a given value: `light | dark` | `auto`
     */
    const handleSetMode = (mode) => {
        setMode(mode);
        setModeInLS(mode);
        setModeInDOM(mode);
        document.dispatchEvent(new CustomEvent(SYNC_THEME_MODE, { detail: mode }));
    };
    /**
     * Toggles between: `light | dark`
     */
    const toggleMode = () => {
        let newMode = mode;
        if (newMode === 'auto')
            newMode = computeModeValue(newMode);
        newMode = newMode === 'dark' ? 'light' : 'dark';
        handleSetMode(newMode);
    };
    /**
     * Sets the value to `<Flowbite theme={{ mode }}>` prop
     */
    const clearMode = () => {
        const newMode = (0, theme_store_1.getThemeMode)() ?? DEFAULT_MODE;
        handleSetMode(newMode);
    };
    return { mode, computedMode: computeModeValue(mode), setMode: handleSetMode, toggleMode, clearMode };
};
exports.useThemeMode = useThemeMode;
/**
 * Custom event listener on `SYNC_THEME_MODE`
 */
const useSyncMode = (onChange) => {
    (0, react_1.useEffect)(() => {
        function handleSync(e) {
            const mode = e.detail;
            onChange(mode);
        }
        document.addEventListener(SYNC_THEME_MODE, handleSync);
        return () => document.removeEventListener(SYNC_THEME_MODE, handleSync);
    }, []); // eslint-disable-line
};
/**
 * Sets the give value in local storage
 */
const setModeInLS = (mode) => localStorage.setItem(LS_THEME_MODE, mode);
/**
 * Add or remove class `dark` on `html` element
 */
const setModeInDOM = (mode) => {
    const computedMode = computeModeValue(mode);
    if (computedMode === 'dark') {
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
    }
};
const getInitialMode = (defaultMode) => {
    if (!(0, is_client_1.isClient)())
        return DEFAULT_MODE;
    const LSMode = localStorage.getItem(LS_THEME_MODE);
    return LSMode ?? defaultMode ?? DEFAULT_MODE;
};
/**
 * Parse `auto` mode value to either `light` or `dark`
 * @returns `light` | `dark`
 */
const computeModeValue = (mode) => {
    return mode === 'auto' ? prefersColorScheme() : mode;
};
/**
 * Get browser prefered color scheme
 * @returns `light` | `dark`
 */
const prefersColorScheme = () => {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
