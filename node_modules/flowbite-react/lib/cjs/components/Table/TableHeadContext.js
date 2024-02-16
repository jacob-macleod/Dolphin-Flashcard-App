"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableHeadContext = exports.TableHeadContext = void 0;
const react_1 = require("react");
exports.TableHeadContext = (0, react_1.createContext)(undefined);
function useTableHeadContext() {
    const context = (0, react_1.useContext)(exports.TableHeadContext);
    if (!context) {
        throw new Error('useTableHeadContext should be used within the TableHeadContext provider!');
    }
    return context;
}
exports.useTableHeadContext = useTableHeadContext;
