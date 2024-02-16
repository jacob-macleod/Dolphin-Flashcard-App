import type * as C from "../core.js";
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */
export declare function mergeTerminateRight_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R1 & R, E | E1, A | A1>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 * @ets_data_first mergeTerminateRight_
 */
export declare function mergeTerminateRight<R1, E1, A1>(that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, A1 | A>;
//# sourceMappingURL=mergeTerminateRight.d.ts.map