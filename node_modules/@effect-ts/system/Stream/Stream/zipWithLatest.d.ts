import { Stream } from "./definitions.js";
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */
export declare function zipWithLatest_<R, R1, E, E1, O, O2, O3>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, f: (o: O, o2: O2) => O3): Stream<R & R1, E | E1, O3>;
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */
export declare function zipWithLatest<R1, E1, O, O2, O3>(that: Stream<R1, E1, O2>, f: (o: O, o2: O2) => O3): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O3>;
//# sourceMappingURL=zipWithLatest.d.ts.map