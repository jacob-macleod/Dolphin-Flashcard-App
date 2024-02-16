import type * as C from "../core.js";
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */
export declare function drainFork_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, other: C.Stream<R1, E1, Z>): C.Stream<R & R1, E | E1, A>;
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 *
 * @ets_data_first drainFork_
 */
export declare function drainFork<R1, E1, A, Z>(other: C.Stream<R1, E1, Z>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=drainFork.d.ts.map