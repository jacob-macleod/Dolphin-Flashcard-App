"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimelineContentContext = exports.TimelineContentContext = void 0;
const react_1 = require("react");
exports.TimelineContentContext = (0, react_1.createContext)(undefined);
function useTimelineContentContext() {
    const context = (0, react_1.useContext)(exports.TimelineContentContext);
    if (!context) {
        throw new Error('useTimelineContentContext should be used within the TimelineContentContext provider!');
    }
    return context;
}
exports.useTimelineContentContext = useTimelineContentContext;
