import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanEffect`.
 */
export declare function scanReduceEffect_<R, R1, E, E1, A, A1 extends A>(self: C.Stream<R, E, A>, f: (a1: A1, a: A) => T.Effect<R1, E1, A1>): C.Stream<R & R1, E | E1, A1>;
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanEffect`.
 *
 * @ets_data_first scanReduceEffect_
 */
export declare function scanReduceEffect<R1, E1, A, A1 extends A>(f: (a1: A1, a: A) => T.Effect<R1, E1, A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=scanReduceEffect.d.ts.map