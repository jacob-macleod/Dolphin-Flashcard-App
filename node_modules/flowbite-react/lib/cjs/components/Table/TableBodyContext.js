"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableBodyContext = exports.TableBodyContext = void 0;
const react_1 = require("react");
exports.TableBodyContext = (0, react_1.createContext)(undefined);
function useTableBodyContext() {
    const context = (0, react_1.useContext)(exports.TableBodyContext);
    if (!context) {
        throw new Error('useTableBodyContext should be used within the TableBodyContext provider!');
    }
    return context;
}
exports.useTableBodyContext = useTableBodyContext;
