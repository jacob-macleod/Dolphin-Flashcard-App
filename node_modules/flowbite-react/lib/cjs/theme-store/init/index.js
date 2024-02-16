"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeInit = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("./client");
const mode_1 = require("./mode");
const server_1 = require("./server");
function ThemeInit({ mode, theme }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(mode_1.ThemeModeInit, { mode: mode }), (0, jsx_runtime_1.jsx)(server_1.ThemeServerInit, { theme: theme }), (0, jsx_runtime_1.jsx)(client_1.ThemeClientInit, { theme: theme })] }));
}
exports.ThemeInit = ThemeInit;
