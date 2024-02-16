import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 */
export declare function scanEffect_<R, R1, E, E1, A, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => T.Effect<R1, E1, S>): C.Stream<R & R1, E | E1, S>;
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 *
 * @ets_data_first scanEffect_
 */
export declare function scanEffect<R1, E1, A, S>(s: S, f: (s: S, a: A) => T.Effect<R1, E1, S>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, S>;
//# sourceMappingURL=scanEffect.d.ts.map