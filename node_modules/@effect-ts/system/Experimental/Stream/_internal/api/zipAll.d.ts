import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 */
export declare function zipAll_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, defaultLeft: A, defaultRight: A1): C.Stream<R & R1, E | E1, Tp.Tuple<[A, A1]>>;
/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * @ets_data_first zipAll_
 */
export declare function zipAll<R1, E1, A, A1>(that: C.Stream<R1, E1, A1>, defaultLeft: A, defaultRight: A1): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, Tp.Tuple<[A, A1]>>;
//# sourceMappingURL=zipAll.d.ts.map