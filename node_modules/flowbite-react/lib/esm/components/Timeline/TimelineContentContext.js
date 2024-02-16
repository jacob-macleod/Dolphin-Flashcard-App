'use client';
import { createContext, useContext } from 'react';
export const TimelineContentContext = createContext(undefined);
export function useTimelineContentContext() {
    const context = useContext(TimelineContentContext);
    if (!context) {
        throw new Error('useTimelineContentContext should be used within the TimelineContentContext provider!');
    }
    return context;
}
