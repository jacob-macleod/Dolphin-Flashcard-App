import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */
export declare function zipAllLeft_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, default_: A): C.Stream<R & R1, E | E1, A>;
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllLeft_
 */
export declare function zipAllLeft<R1, E1, A, A1>(that: C.Stream<R1, E1, A1>, default_: A): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=zipAllLeft.d.ts.map