"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = exports.setTheme = exports.getThemeMode = exports.setThemeMode = void 0;
const clone_deep_1 = require("../helpers/clone-deep");
const merge_deep_1 = require("../helpers/merge-deep");
const theme_1 = require("../theme");
const store = {
    theme: (0, clone_deep_1.cloneDeep)(theme_1.theme),
};
function setThemeMode(mode) {
    store.mode = mode;
}
exports.setThemeMode = setThemeMode;
function getThemeMode() {
    return store.mode;
}
exports.getThemeMode = getThemeMode;
function setTheme(theme) {
    if (theme)
        store.theme = (0, merge_deep_1.mergeDeep)(theme_1.theme, theme);
}
exports.setTheme = setTheme;
function getTheme() {
    return (0, clone_deep_1.cloneDeep)(store.theme);
}
exports.getTheme = getTheme;
