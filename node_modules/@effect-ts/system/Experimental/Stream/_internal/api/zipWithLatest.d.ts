import type * as C from "../core.js";
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */
export declare function zipWithLatest_<R, R1, E, E1, A, A1, A2>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => A2): C.Stream<R & R1, E | E1, A2>;
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 *
 * @ets_data_first zipWithLatest_
 */
export declare function zipWithLatest<R1, E1, A, A1, A2>(that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => A2): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A2>;
//# sourceMappingURL=zipWithLatest.d.ts.map