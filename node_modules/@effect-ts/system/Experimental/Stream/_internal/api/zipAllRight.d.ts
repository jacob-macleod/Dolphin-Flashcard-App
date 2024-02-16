import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */
export declare function zipAllRight_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, default_: A1): C.Stream<R & R1, E | E1, A1>;
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllRight_
 */
export declare function zipAllRight<R1, E1, A1>(that: C.Stream<R1, E1, A1>, default_: A1): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=zipAllRight.d.ts.map