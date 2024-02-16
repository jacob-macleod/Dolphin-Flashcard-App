import type { Stream } from "./definitions.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */
export declare function catchAll_<R, R1, E, E2, O, O1>(self: Stream<R, E, O>, f: (e: E) => Stream<R1, E2, O1>): Stream<R & R1, E2, O | O1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */
export declare function catchAll<R1, E, E2, O, O1>(f: (e: E) => Stream<R1, E2, O1>): <R>(self: Stream<R, E, O>) => Stream<R & R1, E2, O | O1>;
//# sourceMappingURL=catchAll.d.ts.map