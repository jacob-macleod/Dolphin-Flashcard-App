"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flowbite = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const init_1 = require("../../theme-store/init");
const Flowbite = ({ children, theme }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(init_1.ThemeInit, { mode: theme?.mode, theme: theme?.theme }), children] }));
};
exports.Flowbite = Flowbite;
exports.Flowbite.displayName = 'Flowbite';
