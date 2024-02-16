import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */
export declare function mapAccumEffect_<R, R1, E, E1, A, A1, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => T.Effect<R1, E1, Tp.Tuple<[S, A1]>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */
export declare function mapAccumEffect<R1, E1, A, A1, S>(s: S, f: (s: S, a: A) => T.Effect<R1, E1, Tp.Tuple<[S, A1]>>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=mapAccumEffect.d.ts.map