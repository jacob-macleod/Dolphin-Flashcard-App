"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropdownContext = exports.DropdownContext = void 0;
const react_1 = require("react");
exports.DropdownContext = (0, react_1.createContext)(undefined);
function useDropdownContext() {
    const context = (0, react_1.useContext)(exports.DropdownContext);
    if (!context) {
        throw new Error('useDropdownContext should be used within the DropdownContext provider!');
    }
    return context;
}
exports.useDropdownContext = useDropdownContext;
