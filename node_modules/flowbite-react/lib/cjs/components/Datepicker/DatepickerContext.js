"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDatePickerContext = exports.DatepickerContext = void 0;
const react_1 = require("react");
exports.DatepickerContext = (0, react_1.createContext)(undefined);
function useDatePickerContext() {
    const context = (0, react_1.useContext)(exports.DatepickerContext);
    if (!context) {
        throw new Error('useDatePickerContext should be used within the DatePickerContext provider!');
    }
    return context;
}
exports.useDatePickerContext = useDatePickerContext;
