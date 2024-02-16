import type { ExecutionStrategy } from "../../../../Effect/index.js";
import type * as C from "../core.js";
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
export declare function zipAllWithExec_<R, R1, E, E1, A, A1, A2, A3, A4>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, exec: ExecutionStrategy, left: (a: A) => A2, right: (a: A1) => A3, both: (a: A, a1: A1) => A4): C.Stream<R & R1, E | E1, A2 | A3 | A4>;
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * The execution strategy `exec` will be used to determine whether to pull
 * from the streams sequentially or in parallel.
 *
 * @ets_data_first zipAllWithExec_
 */
export declare function zipAllWithExec<R1, E1, A, A1, A2, A3, A4>(that: C.Stream<R1, E1, A1>, exec: ExecutionStrategy, left: (a: A) => A2, right: (a: A1) => A3, both: (a: A, a1: A1) => A4): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A2 | A3 | A4>;
//# sourceMappingURL=zipAllWithExec.d.ts.map