import type * as C from "../core.js";
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */
export declare function mergeTerminateLeft_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R1 & R, E | E1, A | A1>;
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 *
 * @ets_data_first mergeTerminateLeft_
 */
export declare function mergeTerminateLeft<R1, E1, A1>(that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, A1 | A>;
//# sourceMappingURL=mergeTerminateLeft.d.ts.map