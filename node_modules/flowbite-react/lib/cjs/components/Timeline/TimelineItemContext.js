"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimelineItemContext = exports.TimelineItemContext = void 0;
const react_1 = require("react");
exports.TimelineItemContext = (0, react_1.createContext)(undefined);
function useTimelineItemContext() {
    const context = (0, react_1.useContext)(exports.TimelineItemContext);
    if (!context) {
        throw new Error('useTimelineItemContext should be used within the TimelineItemContext provider!');
    }
    return context;
}
exports.useTimelineItemContext = useTimelineItemContext;
