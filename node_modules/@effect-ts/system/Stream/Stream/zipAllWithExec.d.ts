import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 */
export declare function zipAllWithExec_<R, R1, E, E1, O, O2, O3>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, exec: T.ExecutionStrategy, left: (o: O) => O3, right: (o2: O2) => O3, both: (o: O, o2: O2) => O3): Stream<R & R1, E | E1, O3>;
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 */
export declare function zipAllWithExec<R1, E1, O, O2, O3>(that: Stream<R1, E1, O2>, exec: T.ExecutionStrategy, left: (o: O) => O3, right: (o2: O2) => O3, both: (o: O, o2: O2) => O3): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E | E1, O3>;
//# sourceMappingURL=zipAllWithExec.d.ts.map