"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModeScript = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ThemeModeScript = ({ mode, ...others }) => {
    return ((0, jsx_runtime_1.jsx)("script", { ...others, "data-flowbite-theme-mode-script": true, dangerouslySetInnerHTML: {
            __html: getScript({ mode, defaultMode: 'light', localStorageKey: 'flowbite-theme-mode' }),
        } }));
};
exports.ThemeModeScript = ThemeModeScript;
function getScript({ mode, defaultMode, localStorageKey, }) {
    return `
    try {
      const mode = window.localStorage.getItem('${localStorageKey}') ?? '${mode}' ?? '${defaultMode}';
      const computedMode =
        mode === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;

      if (computedMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  `;
}
