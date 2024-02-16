'use client';
import { createContext, useContext } from 'react';
export const TimelineItemContext = createContext(undefined);
export function useTimelineItemContext() {
    const context = useContext(TimelineItemContext);
    if (!context) {
        throw new Error('useTimelineItemContext should be used within the TimelineItemContext provider!');
    }
    return context;
}
