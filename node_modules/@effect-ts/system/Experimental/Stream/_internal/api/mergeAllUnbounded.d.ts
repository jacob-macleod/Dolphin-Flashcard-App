import type * as C from "../core.js";
/**
 * Like `mergeAll`, but runs all streams concurrently.
 */
export declare function mergeAllUnbounded(outputBuffer?: number): <R, E, O>(...streams: C.Stream<R, E, O>[]) => C.Stream<R, E, O>;
//# sourceMappingURL=mergeAllUnbounded.d.ts.map