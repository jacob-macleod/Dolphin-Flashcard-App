import { cloneDeep } from '../helpers/clone-deep';
import { mergeDeep } from '../helpers/merge-deep';
import { theme as defaultTheme } from '../theme';
const store = {
    theme: cloneDeep(defaultTheme),
};
export function setThemeMode(mode) {
    store.mode = mode;
}
export function getThemeMode() {
    return store.mode;
}
export function setTheme(theme) {
    if (theme)
        store.theme = mergeDeep(defaultTheme, theme);
}
export function getTheme() {
    return cloneDeep(store.theme);
}
