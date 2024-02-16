import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */
export declare function zipAllRight_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, default_: O2): Stream<R & R1, E | E1, O2>;
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllRight_
 */
export declare function zipAllRight<R1, E1, O, O2>(that: Stream<R1, E1, O2>, default_: O2): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E | E1, O2>;
//# sourceMappingURL=zipAllRight.d.ts.map