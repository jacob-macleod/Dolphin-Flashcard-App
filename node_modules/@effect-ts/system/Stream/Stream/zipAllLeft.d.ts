import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */
export declare function zipAllLeft_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, default_: O): Stream<R & R1, E | E1, O>;
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllLeft_
 */
export declare function zipAllLeft<R1, E1, O, O2>(that: Stream<R1, E1, O2>, default_: O): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E | E1, O>;
//# sourceMappingURL=zipAllLeft.d.ts.map