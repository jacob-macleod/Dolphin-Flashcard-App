import type { Stream } from "./definitions.js";
/**
 * Merges a variable list of streams in a non-deterministic fashion.
 * Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` chunks may be buffered by this operator.
 */
export declare function mergeAll(n: number, outputBuffer?: number): <R, E, O>(...streams: Stream<R, E, O>[]) => Stream<R, E, O>;
//# sourceMappingURL=mergeAll.d.ts.map