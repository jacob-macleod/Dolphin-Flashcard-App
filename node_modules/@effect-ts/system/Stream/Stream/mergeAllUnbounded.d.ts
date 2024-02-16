import type { Stream } from "./definitions.js";
/**
 * Like `mergeAll`, but runs all streams concurrently.
 */
export declare function mergeAllUnbounded(outputBuffer?: number): <R, E, O>(...streams: Stream<R, E, O>[]) => Stream<R, E, O>;
//# sourceMappingURL=mergeAllUnbounded.d.ts.map