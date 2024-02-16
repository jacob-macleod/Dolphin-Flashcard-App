"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModeInit = void 0;
const __1 = require("..");
const use_theme_mode_1 = require("../../hooks/use-theme-mode");
function ThemeModeInit({ mode }) {
    if (mode)
        (0, __1.setThemeMode)(mode);
    (0, use_theme_mode_1.useThemeMode)();
    return null;
}
exports.ThemeModeInit = ThemeModeInit;
