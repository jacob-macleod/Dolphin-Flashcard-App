import type { Stream } from "./definitions.js";
/**
 * Like `flattenPar`, but executes all streams concurrently.
 */
export declare function flattenParUnbounded<R, R1, E, E1, O1>(self: Stream<R, E, Stream<R1, E1, O1>>, outputBuffer?: number): Stream<R & R1, E | E1, O1>;
//# sourceMappingURL=flattenParUnbounded.d.ts.map